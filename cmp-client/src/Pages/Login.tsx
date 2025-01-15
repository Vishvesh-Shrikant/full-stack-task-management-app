import LoginForm from '@/components/forms/LoginForm';
import logo from '../assets/Logo.png'
import {motion} from 'motion/react'


const pageVariants = {
  initial: {  x: "100vw" }, 
  animate: {  x: 0 }, 
  exit: {   x: "-100vw" },
};

const pageTransition = {
  type: "easeInOut",
  stiffness: 50,
  duration: 0.6,
};
const displayVariants={
  initial:{opacity:0},
  animate:{opacity:1},
  exit:{opacity:0}
}
const displayTransition={
  type: "easeInOut",
  stiffness: 50,
  duration:0.8
}

 


const Login = () => {
  return (
    <div className="w-full h-screen flex">
        <motion.div
          variants={pageVariants}
          transition={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          
          className="h-full w-1/2 bg-lightText flex justify-center items-center">
            <img src={logo} alt="logo.png" className='w-5/6'></img>
        </motion.div  >
        <div className='w-full flex justify-center items-center p-10'>
          <motion.div 
          variants={displayVariants}
          transition={displayTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className='w-3/5 h-full flex justify-center items-center'>
            <LoginForm/>
          </motion.div>
        </div>
        
    </div>
  )
}

export default Login