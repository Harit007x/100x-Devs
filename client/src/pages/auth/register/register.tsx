import {
    Form,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Register = () => {

    const form :any = useForm()

    const onSubmit = () => {
        
    }

    return (
        <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div
                className="absolute right-4 top-4 md:right-8 md:top-8"
            >
                <Button variant={'ghost'} className="md:right-8 md:top-8" type="submit">Login</Button>
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
                    {/* <UserAuthForm /> */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-4 py-2 pb-6">
                                <div className="flex flex-col gap-2 items-start">
                                    {/* <Label htmlFor="first_name">
                                        Full Name
                                    </Label> */}
                                    <div className="flex items-center gap-2 ">
                                        <Input
                                            id="first_name"
                                            placeholder="First Name"
                                            // defaultValue={props.taskItem.first_name}
                                            {...form.register("first_name")}
                                        />
                                        <span className="text-muted-foreground">-</span>
                                        <Input
                                            id="last_name"
                                            placeholder="Last Name"
                                            // defaultValue={props.taskItem.last_name}
                                            {...form.register("last_name")}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 items-start">
                                    {/* <Label htmlFor="username">
                                        Username
                                    </Label> */}
                                    <Input
                                        id="username"
                                        placeholder="Email"
                                        // defaultValue={props.taskItem.username}
                                        {...form.register("username")}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 items-start">
                                    {/* <Label htmlFor="username">
                                        Username
                                    </Label> */}
                                    <Input
                                        id="password"
                                        placeholder="Password"
                                        // defaultValue={props.taskItem.password}
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
  )
}

export default Register