"use client"

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Heart, Calendar, MapPin, Clock, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export function HeroSection() {
    return (
        <main className="overflow-hidden">
            <div
                aria-hidden
                className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block">
                <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
            </div>
            <section>
                <div className="relative pt-24 md:pt-36">
                    <AnimatedGroup
                        variants={transitionVariants}
                        className="absolute inset-0 -z-20">
                        <Image
                            src="https://cdn.curyrio.com.br/images/ImagemdoWhatsAppde2025-07-04s14.41.58_317d5b5f.avif"
                            alt="background"
                            className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block"
                            width="3276"
                            height="4095"
                        />
                    </AnimatedGroup>
                    <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"></div>
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                            <AnimatedGroup variants={transitionVariants}>
                                <Link
                                    href="#event"
                                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950">
                                    <Sparkles className="h-4 w-4 text-primary" />
                                    <span className="text-foreground text-sm">Baile de Inverno</span>
                                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                                        <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                            <span className="flex size-6">
                                                <ArrowRight className="m-auto size-3" />
                                            </span>
                                            <span className="flex size-6">
                                                <ArrowRight className="m-auto size-3" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </AnimatedGroup>

                            <TextEffect
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                as="h1"
                                className="mt-8 text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]">
                                <span className="bg-gradient-to-r from-white via-primary to-blue-400 bg-clip-text text-transparent">
                                    XV Anos
                                </span>
                            </TextEffect>
                            <TextEffect
                                per="line"
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                delay={0.5}
                                as="h2"
                                className="mx-auto mt-4 text-balance text-4xl md:text-5xl lg:text-6xl font-light text-white/90">
                                Ana Carolina
                            </TextEffect>
                            <TextEffect
                                per="line"
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                delay={0.7}
                                as="p"
                                className="mx-auto mt-8 max-w-2xl text-balance text-lg text-white/80">
                                Uma noite mágica de festa, dança e momentos inesquecíveis
                            </TextEffect>

                            <AnimatedGroup
                                variants={transitionVariants}
                                className="mt-12 flex flex-col items-center justify-center gap-6 md:flex-row">
                                <div
                                    key={1}
                                    className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="rounded-xl px-5 text-base bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90">
                                        <Link href="#confirmation">
                                            <Heart className="h-5 w-5 mr-2" />
                                            <span className="text-nowrap">Confirmar Presença</span>
                                        </Link>
                                    </Button>
                                </div>
                                <Button
                                    key={2}
                                    asChild
                                    size="lg"
                                    variant="ghost"
                                    className="h-10.5 rounded-xl px-5 text-white hover:bg-white/10">
                                    <Link href="#details">
                                        <span className="text-nowrap">Ver Detalhes</span>
                                    </Link>
                                </Button>
                            </AnimatedGroup>

                            {/* Event Details */}
                            <AnimatedGroup
                                variants={transitionVariants}
                                className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                                <div className="flex flex-col items-center space-y-2 p-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-full flex items-center justify-center border border-primary/30">
                                        <Calendar className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-white/60 text-sm font-medium uppercase tracking-wide">Data</p>
                                        <p className="text-white font-semibold">21 de Novembro</p>
                                        <p className="text-white/80 text-sm">2025</p>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col items-center space-y-2 p-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-full flex items-center justify-center border border-primary/30">
                                        <Clock className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-white/60 text-sm font-medium uppercase tracking-wide">Horário</p>
                                        <p className="text-white font-semibold">21h</p>
                                        <p className="text-white/80 text-sm">Em ponto</p>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col items-center space-y-2 p-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-full flex items-center justify-center border border-primary/30">
                                        <MapPin className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-white/60 text-sm font-medium uppercase tracking-wide">Local</p>
                                        <p className="text-white font-semibold">Casa de Festa</p>
                                        <p className="text-white/80 text-sm">Royalle</p>
                                    </div>
                                </div>
                            </AnimatedGroup>
                        </div>
                    </div>

                    <AnimatedGroup
                            variants={transitionVariants}>
                        <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                            <div
                                aria-hidden
                                className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                            />
                            <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                                <div className="bg-gradient-to-r from-primary/10 to-blue-400/10 aspect-15/8 relative rounded-2xl flex items-center justify-center">
                                    <div className="text-center">
                                        <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                                        <h3 className="text-2xl font-bold text-white mb-2">Dress Code</h3>
                                        <p className="text-white/90 text-lg">Esporte Fino</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedGroup>
                </div>
            </section>
        </main>
    )
}