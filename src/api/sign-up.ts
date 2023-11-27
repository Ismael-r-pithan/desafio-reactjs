import { SignUpProps } from "@/app/sign-up/page";
import httpClient from "@/lib/http-client";

export async function handleSignUp({ name, email, password }: SignUpProps) {
    try {
        await httpClient.post("/users", { name, email, password });
    } catch (error) {
       throw error;
    } 
}