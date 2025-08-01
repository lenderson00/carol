import { signIn } from "@/lib/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";

const loginSchema = z.object({
  username: z.string().min(1, "Por favor, insira um usuário"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export function useLoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginSchema) {
    const { username, password } = values;
    try {
      const result = await signIn({ username, password });
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Login realizado com sucesso!");
      }
    } catch (error: unknown) {

      console.error("NEXT_AUTH_ERROR", error);
      toast.error("Ocorreu um erro inesperado.");
    }
  }

  return { form, onSubmit };
}
