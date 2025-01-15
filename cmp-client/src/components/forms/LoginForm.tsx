import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Link, useNavigate, useSearchParams } from 'react-router';
import api from '@/api/axiosApi';
import { useAuth } from '@/hooks/useAuth';

const FormSchema = () =>{
    return z.object({
      username: z.string().min(1, "Username is required").min(8, "Username must be atleast 8 characters").max(20, "Username cannot exceed 20 characters"), 
      password: z.string().min(1, "Password is Required").min(8,"Passwords must be 8 characters").max(20, "Password cannot exceed 20 characters"),
  })}

const LoginForm = () => {
  const { toast } = useToast()
  const {login } = useAuth()
  const [searchParams] = useSearchParams();
  const navigate= useNavigate()
  const formSchema= FormSchema()
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
      username: "",
      password: ""
    },
  })
  const {reset}= form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(searchParams.get("from"))
    console.log(values)
    api.post('/auth/login', {username:values.username, password:values.password})
    .then(res=>{
      if(res.status===200)
      {
        toast({
          title: `Logged in successfully `,
          description: "You have been successfully logged in ",
        })

        login(res.data.accessToken)
        const redirectTo = searchParams.get("from") || "/";
        console.log(redirectTo)
        navigate(redirectTo);
      }
    })
    .catch(err=>{
      if(err.response.data.msg==="User does not exist")
      {
        toast({
          variant: "destructive",
          title: `User does not exist `,
          description: "Enter valid username",
          action: <ToastAction altText="Try again" onClick={()=>{
            reset()}}>Try again</ToastAction>,
        })
      }
      else if (err.response.data.msg==='Incorrect Password')
      {
        toast({
          variant: "destructive",
          title: `Incorrect Password`,
          description: "Enter correct password",
          action: <ToastAction altText="Try again" onClick={()=>{
            reset()}}>Try again</ToastAction>,
        })
      }
    })
  }


  return (
    <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full text-lightText flex flex-col justify-center">
            <h1 className='text-3xl font-bold text-center'> Log In</h1>
            {/* username field*/}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel className='text-lg font-semibold text-lightText'>Username</FormLabel>
                    <FormControl>
                      <Input {...field}  className='w-full rounded-lg border-lightText'/>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* password field  */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel className='text-lg font-semibold text-lightText'>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type='password'  className='w-full rounded-lg border-lightText'/>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=' flex justify-center items-center'>
              <Button type="submit" className='bg-lightText w-1/4'>Submit</Button>
            </div>

            <div className='flex justify-center text-lg'>
              <p className='mx-2 '>Don't have an account?</p>
              <Link to="/signup" className='font-semibold'>
                Sign Up
              </Link>
            </div>
            
          </form>
        </Form>
    </>
  )
  }

export default LoginForm