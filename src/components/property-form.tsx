"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Trash2, Loader2, ArrowLeft, ArrowRight } from "lucide-react"
import UploadImage from "./upload-image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Stepper, CompactStepper } from "./stepper"
import { PROPERTY_STATUS_OPTIONS, PROPERTY_TYPE_OPTIONS } from "@/lib/validations/property"
import { RegionDialog } from "./region-dialog"

type Units = {
  studio: boolean;
  oneBedroom: boolean;
  twoBedrooms: boolean;
  threeBedrooms: boolean;
};

type Address = {
  standAddress: string;
  siteAddress: string;
};

type Media = {
  images: string[];
  videos: string[];
};

interface PropertyFormData {
  nameImovel: string
  regionId: string
  banner: string
  bannerType: 'IMAGE' | 'VIDEO'
  city: string
  neighborhood: string
  description: string
  status: string
  type: string
  curyOriginalLink: string
  isActive: boolean
  units: Units
  highlights: string[]
  amenities: string[]
  media: Media
  address: Address
  regionAbout: string
}

interface PropertyFormProps {
  propertyToEdit?: PropertyFormData & { id: string }
  onPropertyRegistered?: () => void
}

const initialFormData: PropertyFormData = {
  nameImovel: "",
  regionId: "",
  banner: "",
  bannerType: "IMAGE",
  city: "",
  neighborhood: "",
  description: "",
  status: "EM_OBRAS",
  type: "APARTAMENTO",
  curyOriginalLink: "",
  isActive: true,
  units: {
    studio: false,
    oneBedroom: false,
    twoBedrooms: false,
    threeBedrooms: false,
  },
  highlights: [""],
  amenities: [""],
  media: {
    images: [""],
    videos: [""],
  },
  address: {
    standAddress: "",
    siteAddress: "",
  },
  regionAbout: "",
}

const steps = [
    { id: 1, name: 'Informações Principais', description: 'Dados básicos do imóvel' },
    { id: 2, name: 'Mídia e Banner', description: 'Imagens e vídeos' },
    { id: 3, name: 'Localização', description: 'Endereço e região' },
    { id: 4, name: 'Detalhes do Imóvel', description: 'Características finais' },
]



interface Region {
  id: string
  name: string
  description?: string
  isActive: boolean
}

export function PropertyForm({ propertyToEdit, onPropertyRegistered }: PropertyFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PropertyFormData>(
    propertyToEdit || initialFormData
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingImages, setUploadingImages] = useState<Record<number, boolean>>({});
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [bannerFile, setBannerFile] = useState<object | null>(null);
  const [regions, setRegions] = useState<Region[]>([])
  const [loadingRegions, setLoadingRegions] = useState(false)
  const [regionDialogOpen, setRegionDialogOpen] = useState(false)

  useEffect(() => {
    if (propertyToEdit) {
      setFormData(propertyToEdit)
    }
  }, [propertyToEdit])

  const fetchRegions = async () => {
    try {
      setLoadingRegions(true)
      const response = await fetch('/api/regions')
      if (response.ok) {
        const data = await response.json()
        setRegions(data)
      }
    } catch (error) {
      console.error('Error fetching regions:', error)
    } finally {
      setLoadingRegions(false)
    }
  }

  useEffect(() => {
    fetchRegions()
  }, [])

  const handleInputChange = (field: string, value: string | boolean | 'IMAGE' | 'VIDEO') => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNestedChange = (
    section: 'units' | 'address' | 'media',
    field: string,
    value: string | boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleArrayChange = (
    field: 'highlights' | 'amenities' | 'images' | 'videos',
    index: number,
    value: string
  ) => {
    const isMedia = field === 'images' || field === 'videos'
    
    setFormData(prev => {
      if (isMedia) {
        return {
          ...prev,
          media: {
            ...prev.media,
            [field]: prev.media[field].map((item, i) => i === index ? value : item),
          }
        }
      }
      return {
        ...prev,
        [field]: (prev[field as 'highlights' | 'amenities']).map((item, i) => i === index ? value : item),
      }
    })
  }
  
  const addArrayItem = (field: 'highlights' | 'amenities' | 'images' | 'videos') => {
    const isMedia = field === 'images' || field === 'videos'

    setFormData(prev => {
      if (isMedia) {
        return {
          ...prev,
          media: {
            ...prev.media,
            [field]: [...prev.media[field], ""],
          }
        }
      }
      return {
        ...prev,
        [field]: [...(prev[field as 'highlights' | 'amenities']), ""],
      }
    })
  }
  
  const removeArrayItem = (
    field: 'highlights' | 'amenities' | 'images' | 'videos',
    index: number
  ) => {
    const isMedia = field === 'images' || field === 'videos'

    setFormData(prev => {
      const currentArray = isMedia ? prev.media[field] : prev[field as 'highlights' | 'amenities']
      if (currentArray.length <= 1) return prev

      if (isMedia) {
        return {
          ...prev,
          media: {
            ...prev.media,
            [field]: currentArray.filter((_, i) => i !== index),
          }
        }
      }
      return {
        ...prev,
        [field]: currentArray.filter((_, i) => i !== index),
      }
    })
  }

  const uploadImageFromUrl = async (imageUrl: string) => {
    if (!imageUrl || imageUrl.startsWith('https://cdn.curyrio.com.br') || !imageUrl.startsWith('http')) {
      throw new Error("URL inválida ou já processada.");
    }

    const response = await fetch(`/api/proxy-image?url=${encodeURIComponent(imageUrl)}`);
    if (!response.ok) {
      throw new Error("Falha ao buscar imagem através do servidor. A URL é válida?");
    }
    const blob = await response.blob();
    
    const originalFileName = imageUrl.split('/').pop()?.split('?')[0] || `image-${Date.now()}`;
    const safeFileName = originalFileName.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const file = new File([blob], safeFileName, { type: blob.type });

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    const uploadResponse = await fetch('/api/bunny', {
      method: 'POST',
      body: uploadFormData,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Falha no upload para o Bunny: ${errorText}`);
    }

    return await uploadResponse.json();
  }

  const uploadVideoFromUrl = async (videoUrl: string) => {
    if (!videoUrl || videoUrl.startsWith('https://') && videoUrl.includes('b-cdn.net') || !videoUrl.startsWith('http')) {
        throw new Error("URL inválida ou já processada.");
    }

    const response = await fetch(`/api/proxy-video?url=${encodeURIComponent(videoUrl)}`);
    if (!response.ok) {
        throw new Error("Falha ao buscar vídeo através do servidor. A URL é válida?");
    }
    const blob = await response.blob();
    
    const originalFileName = videoUrl.split('/').pop()?.split('?')[0] || `video-${Date.now()}.mp4`;
    const safeFileName = originalFileName.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const file = new File([blob], safeFileName, { type: blob.type });

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    const uploadResponse = await fetch('/api/bunny-video', {
        method: 'POST',
        body: uploadFormData,
    });

    if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(`Falha no upload de vídeo para o Bunny: ${errorText}`);
    }

    return await uploadResponse.json();
  }

  const handleVideoUrlUpload = async () => {
    const videoUrl = formData.banner;
    if (!videoUrl || typeof videoUrl !== 'string' || videoUrl.startsWith('https://') && videoUrl.includes('b-cdn.net')) return;

    setIsUploadingBanner(true);
    const toastId = "upload-video-url";
    toast.loading("Enviando vídeo a partir de URL...", { id: toastId });

    try {
        const result = await uploadVideoFromUrl(videoUrl);
        handleInputChange('banner', result.url);
        toast.success("Vídeo enviado com sucesso!", { id: toastId });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido.";
        if (errorMessage !== "URL inválida ou já processada.") {
            toast.error(`Falha no upload: ${errorMessage}`, { id: toastId });
        } else {
            toast.dismiss(toastId);
        }
    } finally {
        setIsUploadingBanner(false);
    }
};

  const handleBannerFileChange = (file: object | null) => {
    if (file instanceof File) {
      setBannerFile(file)
    } else if (!file) {
      setBannerFile(null)
      handleInputChange('banner', '')
    }
  }

  const uploadBanner = async (file: File) => {
    setIsUploadingBanner(true)
    const toastId = "upload-banner-file"
    toast.loading("Enviando banner...", { id: toastId })
    
    try {
      const uploadFormData = new FormData()
      uploadFormData.append("file", file)
  
      const uploadResponse = await fetch("/api/bunny", {
        method: "POST",
        body: uploadFormData,
      })
  
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text()
        throw new Error(`Falha no upload para o Bunny: ${errorText}`)
      }
  
      const result = await uploadResponse.json()
      toast.success("Banner enviado com sucesso!", { id: toastId })
      return result.url

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido."
        toast.error(`Falha no upload: ${errorMessage}`, { id: toastId })
        throw error // Re-throw to be caught by handleSubmit
    } finally {
      setIsUploadingBanner(false)
    }
  }

  useEffect(() => {
    if (bannerFile instanceof File) {
      uploadBanner(bannerFile).then(url => {
        handleInputChange('banner', url)
        setBannerFile(null) // Clear the file after upload
      }).catch(() => {
        // Error is handled in uploadBanner
        setBannerFile(null) // Clear on error too
      })
    }
   
  }, [bannerFile])


  const handleImageUploadFromUrl = async (index: number) => {
    const imageUrl = formData.media.images[index]
    if (!imageUrl || imageUrl.startsWith('https://cdn.curyrio.com.br') || !imageUrl.startsWith('http')) return;

    setUploadingImages(prev => ({ ...prev, [index]: true }))
    const toastId = `upload-${index}`
    toast.loading("Enviando imagem...", { id: toastId })

    try {
      const result = await uploadImageFromUrl(imageUrl);
      handleArrayChange('images', index, result.url)
      toast.success("Imagem enviada com sucesso!", { id: toastId })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido."
       if (errorMessage !== "URL inválida ou já processada.") {
        toast.error(`Falha no upload: ${errorMessage}`, { id: toastId });
      } else {
        toast.dismiss(toastId);
      }
    } finally {
      setUploadingImages(prev => ({ ...prev, [index]: false }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isUploadingBanner || Object.values(uploadingImages).some(v => v)) {
      toast.info("Por favor, aguarde o upload de mídias ser finalizado.")
      return
    }

    setIsSubmitting(true)

    const url = propertyToEdit
      ? `/api/properties/${propertyToEdit.id}`
      : '/api/properties'
    const method = propertyToEdit ? 'PUT' : 'POST'

    const promise = fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(async (response) => {
      if (response.ok) {
        if (!propertyToEdit) {
          setFormData(initialFormData)
          setCurrentStep(1)
        }
        onPropertyRegistered?.()
        return response.json()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Ocorreu um erro desconhecido.')
      }
    })

    toast.promise(promise, {
      loading: propertyToEdit
        ? 'Atualizando imóvel...'
        : 'Cadastrando imóvel...',
      success: propertyToEdit
        ? 'Imóvel atualizado com sucesso!'
        : 'Imóvel cadastrado com sucesso!',
      error: (err) => `Erro: ${err.message}`,
      finally: () => setIsSubmitting(false),
    })
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
        {/* Stepper */}
        <div className="mb-12">
            <div className="hidden md:block">
                <Stepper steps={steps} currentStep={currentStep} />
            </div>
            <div className="block md:hidden">
                <CompactStepper steps={steps} currentStep={currentStep} />
            </div>
            {/* Progress Bar */}
            <div className="mt-6">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Progresso</span>
                    <span>{Math.round((currentStep / steps.length) * 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                    <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${(currentStep / steps.length) * 100}%` }}
                    />
                </div>
            </div>
        </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        {currentStep === 1 && (
             <Card>
             <CardHeader>
               <CardTitle>Informações Principais</CardTitle>
               <CardDescription>
                 Insira os detalhes principais do imóvel.
               </CardDescription>
             </CardHeader>
             <CardContent className="grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <Label htmlFor="nameImovel">Nome do Imóvel</Label>
                 <Input id="nameImovel" value={formData.nameImovel} onChange={(e) => handleInputChange('nameImovel', e.target.value)} required />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="type">Tipo do Imóvel</Label>
                 <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                   <SelectTrigger id="type">
                     <SelectValue placeholder="Selecione o tipo" />
                   </SelectTrigger>
                   <SelectContent>
                     {PROPERTY_TYPE_OPTIONS.map((option) => (
                       <SelectItem key={option.value} value={option.value}>
                         {option.label}
                       </SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>
               <div className="space-y-2">
                 <Label htmlFor="status">Status do Empreendimento</Label>
                 <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                   <SelectTrigger id="status">
                     <SelectValue placeholder="Selecione o status" />
                   </SelectTrigger>
                   <SelectContent>
                     {PROPERTY_STATUS_OPTIONS.map((option) => (
                       <SelectItem key={option.value} value={option.value}>
                         {option.label}
                       </SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>
               <div className="md:col-span-2 space-y-2">
                 <Label htmlFor="curyOriginalLink" className="flex items-center gap-2">
                   <span className="text-orange-600 font-semibold">🔗 Link Cury Original</span>
                   <span className="text-xs text-muted-foreground">(Obrigatório)</span>
                 </Label>
                 <Input 
                   id="curyOriginalLink" 
                   value={formData.curyOriginalLink} 
                   onChange={(e) => handleInputChange('curyOriginalLink', e.target.value)} 
                   placeholder="https://cury.com.br/imovel/..." 
                   className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                   required 
                 />
               </div>
               <div className="md:col-span-2 space-y-2">
                 <Label htmlFor="description">Descrição</Label>
                 <textarea id="description" value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} className="w-full min-h-[120px] p-3 border border-input rounded-md" required />
               </div>
             </CardContent>
           </Card>
        )}
        {currentStep === 2 && (
            <div className="grid gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Banner do Imóvel</CardTitle>
                    <CardDescription>Selecione uma imagem ou vídeo para ser o banner principal.</CardDescription>
                </CardHeader>
                <CardContent>
                <Tabs 
                    value={formData.bannerType} 
                    onValueChange={(value) => handleInputChange('bannerType', value as 'IMAGE' | 'VIDEO')}
                    className="w-full"
                    >
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="IMAGE">Imagem</TabsTrigger>
                        <TabsTrigger value="VIDEO">Vídeo</TabsTrigger>
                    </TabsList>
                    <TabsContent value="IMAGE" className="mt-4">
                        <UploadImage 
                        onFileChange={handleBannerFileChange}
                        initialImageUrl={formData.bannerType === 'IMAGE' ? formData.banner : undefined}
                        />
                         {isUploadingBanner && formData.bannerType === 'IMAGE' && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Enviando banner...</span>
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="VIDEO" className="mt-4">
                        <Label htmlFor="banner-video-url">URL do Vídeo (.mp4)</Label>
                        <div className="relative w-full">
                        <Input 
                            id="banner-video-url" 
                            value={formData.bannerType === 'VIDEO' ? formData.banner : ''} 
                            onChange={(e) => handleInputChange('banner', e.target.value)} 
                            onBlur={handleVideoUrlUpload}
                            disabled={isUploadingBanner}
                            placeholder="https://example.com/video.mp4"
                        />
                        {isUploadingBanner && formData.bannerType === 'VIDEO' && (
                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            </div>
                        )}
                        </div>
                    </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
            <Card>
            <CardHeader>
              <CardTitle>Mídia da Galeria</CardTitle>
              <CardDescription>Adicione URLs para imagens e vídeos da galeria.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Galeria de Imagens</h4>
                  <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('images')}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Imagem
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.media.images.map((img, i) => (
                    <div key={i} className="space-y-3">
                      {/* Thumbnail Preview */}
                      {img && (
                        <div className="aspect-video relative w-full overflow-hidden rounded-lg border bg-muted">
                          <img
                            src={img}
                            alt={`Imagem ${i + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none"
                              e.currentTarget.nextElementSibling?.classList.remove('hidden')
                            }}
                            onLoad={(e) => {
                              e.currentTarget.style.display = "block"
                              e.currentTarget.nextElementSibling?.classList.add('hidden')
                            }}
                          />
                          <div className="hidden absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-sm">
                            Imagem não encontrada
                          </div>
                        </div>
                      )}
                      {/* URL Input */}
                      <div className="flex gap-2 items-center">
                        <div className="relative flex-1">
                          <Input
                            value={img}
                            onChange={(e) => handleArrayChange('images', i, e.target.value)}
                            onBlur={() => handleImageUploadFromUrl(i)}
                            placeholder={`URL da Imagem ${i + 1}`}
                            disabled={uploadingImages[i]}
                            className="pr-10"
                          />
                          {uploadingImages[i] && (
                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                            </div>
                          )}
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeArrayItem('images', i)} 
                          disabled={formData.media.images.length <= 1}
                          className="shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">URLs de Vídeo</h4>
                  <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('videos')}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Vídeo
                  </Button>
                </div>
                {formData.media.videos.map((vid, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <Input value={vid} onChange={(e) => handleArrayChange('videos', i, e.target.value)} placeholder={`URL do Vídeo ${i + 1}`} className="flex-1" />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('videos', i)} disabled={formData.media.videos.length <= 1}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </div>
        )}
        {currentStep === 3 && (
            <div className="grid gap-8">
                 <Card>
                    <CardHeader>
                    <CardTitle>Endereço</CardTitle>
                    <CardDescription>Insira os endereços do imóvel.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="regionId">Região</Label>
                        <div className="flex gap-2">
                            <Select value={formData.regionId} onValueChange={(value) => handleInputChange('regionId', value)}>
                                <SelectTrigger id="regionId" className="flex-1">
                                    <SelectValue placeholder="Selecione uma região" />
                                </SelectTrigger>
                                <SelectContent>
                                    {loadingRegions ? (
                                        <SelectItem value="" disabled>
                                            Carregando regiões...
                                        </SelectItem>
                                    ) : regions.length === 0 ? (
                                        <SelectItem value="" disabled>
                                            Nenhuma região encontrada
                                        </SelectItem>
                                    ) : (
                                        regions.map((region) => (
                                            <SelectItem key={region.id} value={region.id}>
                                                {region.name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => setRegionDialogOpen(true)}
                                title="Adicionar nova região"
                            >
                                <PlusCircle className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="city">Cidade</Label>
                        <Input id="city" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="neighborhood">Bairro</Label>
                        <Input id="neighborhood" value={formData.neighborhood} onChange={(e) => handleInputChange('neighborhood', e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="standAddress">Endereço do Stand</Label>
                        <Input id="standAddress" value={formData.address.standAddress} onChange={(e) => handleNestedChange('address', 'standAddress', e.target.value)} required />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="siteAddress">Endereço do Local</Label>
                        <Input id="siteAddress" value={formData.address.siteAddress} onChange={(e) => handleNestedChange('address', 'siteAddress', e.target.value)} required />
                    </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                    <CardTitle>Sobre a Região</CardTitle>
                    <CardDescription>Forneça uma descrição da área ao redor.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="regionAbout">Descrição da Região</Label>
                        <textarea id="regionAbout" value={formData.regionAbout} onChange={(e) => handleInputChange('regionAbout', e.target.value)} className="w-full min-h-[120px] p-3 border border-input rounded-md" required />
                    </div>
                    </CardContent>
                </Card>
            </div>
        )}
        {currentStep === 4 && (
          <div className="grid gap-8">
            <Card>
                <CardHeader>
                <CardTitle>Destaques e Comodidades</CardTitle>
                <CardDescription>Liste as principais características e comodidades do imóvel.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                    <h4 className="font-medium">Destaques</h4>
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('highlights')}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Adicionar
                    </Button>
                    </div>
                    {formData.highlights.map((h, i) => (
                    <div key={i} className="flex gap-2 items-center">
                        <Input value={h} onChange={(e) => handleArrayChange('highlights', i, e.target.value)} placeholder={`Destaque ${i + 1}`} />
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('highlights', i)} disabled={formData.highlights.length <= 1}>
                        <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    ))}
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                    <h4 className="font-medium">Comodidades</h4>
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('amenities')}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Adicionar
                    </Button>
                    </div>
                    {formData.amenities.map((a, i) => (
                    <div key={i} className="flex gap-2 items-center">
                        <Input value={a} onChange={(e) => handleArrayChange('amenities', i, e.target.value)} placeholder={`Comodidade ${i + 1}`} />
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('amenities', i)} disabled={formData.amenities.length <= 1}>
                        <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    ))}
                </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle>Unidades</CardTitle>
                <CardDescription>Especifique os tipos de unidades disponíveis.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="studio" checked={formData.units.studio} onChange={(e) => handleNestedChange('units', 'studio', e.target.checked)} />
                    <Label htmlFor="studio">Studio</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="oneBedroom" checked={formData.units.oneBedroom} onChange={(e) => handleNestedChange('units', 'oneBedroom', e.target.checked)} />
                    <Label htmlFor="oneBedroom">1 Quarto</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="twoBedrooms" checked={formData.units.twoBedrooms} onChange={(e) => handleNestedChange('units', 'twoBedrooms', e.target.checked)} />
                    <Label htmlFor="twoBedrooms">2 Quartos</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="threeBedrooms" checked={formData.units.threeBedrooms} onChange={(e) => handleNestedChange('units', 'threeBedrooms', e.target.checked)} />
                    <Label htmlFor="threeBedrooms">3 Quartos</Label>
                </div>
                </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t bg-background/50 backdrop-blur-sm sticky bottom-0 pb-4">
          <div>
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={handlePrev} size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
            )}
          </div>
          <div className="flex items-center gap-4">
            {currentStep < steps.length && (
              <>
                <div className="text-sm text-muted-foreground hidden sm:block">
                  Passo {currentStep} de {steps.length}
                </div>
                <Button type="button" onClick={handleNext} size="lg">
                  Próximo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}
            {currentStep === steps.length && (
              <Button type="submit" size="lg" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {propertyToEdit ? 'Salvando...' : 'Cadastrando...'}
                  </>
                ) : (
                  propertyToEdit ? 'Salvar Alterações' : 'Cadastrar Imóvel'
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
      
      <RegionDialog
        open={regionDialogOpen}
        onOpenChange={setRegionDialogOpen}
        onSuccess={fetchRegions}
      />
    </div>
  )
} 