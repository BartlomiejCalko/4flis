"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import { toast } from "sonner";
import FormField from "@/components/FormField";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";


const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  })
 }


const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === 'sign-up') {
        const { name, email, password } = values;

        // Create user in Firebase Authentication
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        // Save user data to Firestore
        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success("Account created successfully");
        router.push("/sign-in");
      } else {
        const { email, password } = values;
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);

        const idToken = await userCredentials.user.getIdToken();

        if (!idToken) {
          toast.error("Sign in failed");
          return;
        }

        await signIn({
          email,
          idToken
        });

        toast.success("Signed in successfully");
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      console.error("Auth error:", error);
      
      // Handle Firebase Auth errors
      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string; message: string };
        
        switch (firebaseError.code) {
          case 'auth/email-already-in-use':
            toast.error("This email is already registered. Please sign in.");
            break;
          case 'auth/invalid-email':
            toast.error("Invalid email address.");
            break;
          case 'auth/weak-password':
            toast.error("Password is too weak. Please use a stronger password.");
            break;
          case 'auth/user-not-found':
            toast.error("No account found with this email.");
            break;
          case 'auth/wrong-password':
            toast.error("Incorrect password.");
            break;
          case 'auth/invalid-credential':
            toast.error("Invalid email or password.");
            break;
          default:
            toast.error(`Authentication error: ${firebaseError.message}`);
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo_flis.png" alt="Logo" width={38} height={32} />
          <h2 className="text-primary-100">4Flis</h2>
        </div>
        <h3 className="text-primary-200 text-md text-center">
          ---------
        </h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="John Doe"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Your password"
              type="password"
            />

            <Button type="submit" className="btn">
              {isSignIn ? "Sign In" : "Create an account"}
            </Button>
          </form>
        </Form>
        {/* <p className="text-center">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default AuthForm;
