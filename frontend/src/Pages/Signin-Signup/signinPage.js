import React, { useState } from 'react';
import imageSrcAlternative from '../../assets/photos/loginImageAlternative.svg'
import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Image, Input } from '@nextui-org/react';
import GoogleIcon from '../../assets/icons/googleIcon';
import AppleIconWhite from '../../assets/icons/appleIconWhite';
import ArrowRight from '../../assets/icons/arrowRightIcon';
import AtIcon from '../../assets/icons/atIcon';
import PasswordInput from '../../components/passwordInputComponent';
import { useNavigate } from 'react-router-dom';
import WebsiteName from '../../components/websiteName';
import axios from 'axios';
import { SIGN_IN } from '../../utils/apiStrings';
import axiosInstance from '../../helpers/axiosInstance';

export default function SigninPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(SIGN_IN, formData);
            navigate(`/dashboard`);
            localStorage.setItem('userId', response.data.user.id)
            localStorage.setItem('accessToken', response.data.token);

        } catch (error) {
            if (error.response) {
                console.error('Error logging in user:', error.response.data);
                alert(error.response.data.message || 'An error occurred during login');
            } else {
                console.error('Error logging in user:', error.message);
                alert('An unexpected error occurred. Please try again later.');
            }
        }
    };
    return <>
        <div className="flex bg-black  w-full h-screen ">
            {/* Left Side */}
            <div className="w-1/2 p-20 space-y-5 ">
                <WebsiteName size='2xl'></WebsiteName>
                <Card className='p-16  bg-gray'>
                    <CardHeader>
                        <p className='font-extrabold text-2xl text-white'>Welcome Back! Please<span className='text-primary'> Signin</span></p>
                    </CardHeader>

                    <CardBody className=''>
                        <form className='space-y-10' onSubmit={handleOnSubmit}>
                            <div className='space-y-10'>
                                <Input className='tex-white' startContent={<AtIcon></AtIcon>} onChange={handleChange} isRequired placeholder='Enter your Email or Phone number' name='identifier' color='white' label="Email or Phone number" labelPlacement='outside'></Input>
                                <PasswordInput
                                    value={formData.password}
                                    onChange={(value) => handleChange({ target: { name: 'password', value } })}
                                />
                            </div>
                            <div className="flex justify-between">
                                <div className='flex space-x text-primary font-semibold'><Checkbox className='bg-priamary'></Checkbox><p>Remember me</p></div>
                                <p className='font-semibold text-primary hover:underline'>Forgot Password?</p>
                            </div>
                            <Button fullWidth type='submit' className='bg-primary text-white font-semibold'>Signin to CommUnity Account</Button>
                        </form>
                        <div>
                            <div className='font-semibold py-3 text-white text-center'>Don't have an Account?
                                <Button className='text-primary bg-transparent' onClick={() => {
                                    navigate('/signup')
                                }} endContent={<ArrowRight></ArrowRight>}>Signup</Button></div>

                            <div className='flex justify-between'>
                                <Button startContent={<GoogleIcon></GoogleIcon>} className='bg-black text-white font-semibold hover:bg-primary'>Sign in with Google</Button>
                                <Button startContent={<AppleIconWhite></AppleIconWhite>} className='bg-black text-white font-semibold hover:bg-primary' >Sign in with AppleID</Button>
                            </div>
                        </div>
                    </CardBody>

                    <CardFooter>
                        <p className='text-white font-semibold'>By proceeding, you agree to the <span className='text-primary underline font-semibold'>Terms and Conditions</span> and <span className='text-primary underline font-semibold'>Privacy Policy</span></p>
                    </CardFooter>
                </Card>
            </div>


            {/* Right Side */}
            <div className="w-1/2 bg-black p-5">
                <div className='flex rounded-3xl w-full h-full  flex-col bg-orange-300 justify-center items-center'>
                    <Image className='' src={imageSrcAlternative} width={600}></Image>
                </div>
            </div>
        </div>
    </>
}