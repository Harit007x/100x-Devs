import {
    Form,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Origin from "../../../assets/origin.png";
import Glitch from "../../../assets/glitch.png";


interface ILoginProps{
    handleLogin: any
    handleRegister: any
    handleSwitchForm: () => void
    switchForm : boolean
}

const Login = (props: ILoginProps) => {
    const form :any = useForm()
    

    const onLoginSubmit = (formData: any) => {
        console.log("login =", formData)
        props.handleLogin(formData)
    }

    const onRegisterSubmit = (formData: any) => {
        console.log("register =", formData)
        props.handleRegister(formData)
    }

    return (
        <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="hidden relative h-full w-full bg-muted lg:flex">
                {/* <img
                    className="absolute inset-0 m-auto self-center object-cover h-full w-full"
                    src={Dots}
                    alt="Dots"
                /> */}
                <img
                    className="absolute inset-0 m-auto self-center object-cover h-full w-full"
                    src={Glitch}
                    alt="Dots"
                />
                <img
                    className="z-[1] m-auto h-[66%]"
                    src={Origin}
                    alt="Origin"
                />
            </div>
            {props.switchForm
                ?
                <div className="lg:p-8">
                    <div
                        className="absolute right-4 top-4 md:right-8 md:top-8"
                    >
                        <Button 
                            type="submit"
                            className="md:right-8 md:top-8"
                            variant={'ghost'}
                            onClick={props.handleSwitchForm}
                        >
                            Login
                        </Button>
                    </div>
                    <div className="hidden h-full bg-muted lg:block" />
                    <div className="lg:p-8">
                        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                            <div className="flex flex-col space-y-2 text-center">
                                {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
                                <h1 className="text-2xl font-semibold tracking-tight">
                                Create an account
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                Enter your email below to create your account
                                </p>
                            </div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onRegisterSubmit)}>
                                    <div className="flex flex-col gap-4 py-2 pb-6">
                                        <div className="flex flex-col gap-2 items-start">
                                            <div className="flex items-center gap-2 ">
                                                <Input
                                                    id="first_name"
                                                    placeholder="First Name"
                                                    {...form.register("first_name")}
                                                />
                                                <span className="text-muted-foreground">-</span>
                                                <Input
                                                    id="last_name"
                                                    placeholder="Last Name"
                                                    {...form.register("last_name")}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 items-start">
                                            <Input
                                                id="user_name"
                                                type="email"
                                                placeholder="Email"
                                                {...form.register("user_name")}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 items-start">
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="Password"
                                                {...form.register("password")}
                                            />
                                        </div>
                                    </div>

                                    <Button className="md:right-8 md:top-8 w-full" type="submit">Sign-Up with Email</Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
                :
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
                            <h1 className="text-2xl font-semibold tracking-tight">
                            Welcome back
                            </h1>
                            <p className="text-sm text-muted-foreground">
                            Enter your email to sign in to your account
                            </p>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onLoginSubmit)}>
                                <div className="flex flex-col gap-4 py-2 pb-6">
                                    <div className="flex flex-col gap-2 items-start">
                                        <Input
                                            id="user_name"
                                            placeholder="name@example.com"
                                            {...form.register("user_name")}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 items-start">
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            {...form.register("password")}
                                        />
                                    </div>
                                </div>
                                <Button className="md:right-8 md:top-8 w-full" type="submit">Sign In</Button>
                            </form>
                        </Form>
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            <span
                                onClick={props.handleSwitchForm}
                                className="cursor-pointer hover:text-brand hover:underline underline-offset-2"
                            >
                                Don&apos;t have an account? Sign Up
                            </span>
                        </p>
                    </div>
                </div>
            }
        </div>
    )
}

export default Login