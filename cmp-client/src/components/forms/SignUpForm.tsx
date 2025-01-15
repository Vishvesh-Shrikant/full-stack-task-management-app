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

import { Link, useNavigate } from 'react-router';
import api from '@/api/axiosApi';



const FormSchema = () =>{
    return z.object({
        fullName: z.string().min(1, "Full Name is required").max(50, "Name cannot exceed 50 characters"),
        username: z.string().min(1, "Username is required").min(8, "Username must be atleast 8 characters").max(20, "Username cannot exceed 20 characters"), 
        password: z.string().min(1, "Password is Required").min(8,"Passwords must be 8 characters").max(20, "Password cannot exceed 20 characters"),
        confirmPassword: z.string().min(1, "Password confirmation is required")
    })
    .refine((data)=> data.password===data.confirmPassword, {
        path: ['confirmPassword'],
        message: "Password do not match"
    }
)}



const SignUpForm = () => {
    const { toast } = useToast()
    const navigate= useNavigate()
    const formSchema= FormSchema()
    const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
            fullName:"",
            username: "",
            password: "",
            confirmPassword:""
        },
    })
    const {reset}= form;

    function onSubmit(values: z.infer<typeof formSchema>) {
      api.post('/auth/register', {fullName:values.fullName, username: values.username, password:values.password})
      .then(res =>{
        if(res.status===409){
          toast({
            variant: "destructive",
            title: `Username already exists`,
            description: "Username should be unique",
            action: <ToastAction altText="Try again" onClick={()=>{
              reset()}}>Try again</ToastAction>,
          })
        } 
        if(res.status===201 && res.data.success)
        {
          toast({
            title: `Account created successfully `,
            description: "Your account has been created ",
          })
          navigate('/login')
        }
        
      })
      .catch(err=>{
        console.log(err)
      })
    }


  return (
    <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full text-lightText flex flex-col justify-center">
            <h1 className='text-3xl font-bold text-center'>Sign Up</h1>
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel className='text-lg font-semibold text-lightText'>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field}  className='w-full rounded-lg border-lightText'/>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

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
            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel className='text-lg font-semibold text-lightText'>Confirm Password</FormLabel>
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
                <p className='mx-2 '>Already have an account?</p>
                <Link to="/login" className='font-semibold'>
                    Sign In
                </Link>
            </div>
          </form>
        </Form>    
    </>
  )
}

export default SignUpForm