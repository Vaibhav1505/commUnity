import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imageSrcAlt from '../../assets/photos/signupImageAlternative.svg'
import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Image, Input } from '@nextui-org/react';
import GoogleIcon from '../../assets/icons/googleIcon';
import AppleIconWhite from '../../assets/icons/appleIconWhite';
import ArrowRight from '../../assets/icons/arrowRightIcon';
import AtIcon from '../../assets/icons/atIcon';
import PasswordInput from '../../components/passwordInputComponent';
import PhoneIcon from '../../assets/icons/phoneIcon';
import UserIcon from '../../assets/icons/userIcon';
import WebsiteName from '../../components/websiteName';
import { SIGN_UP } from '../../utils/apiStrings';
import axios from 'axios';


export default function SignupPage() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(SIGN_UP, formData);
            if(response.status >= 200 && response.status < 300){
                
                const responseData= response.data
                navigate('/signin');
                console.log('User created:'+responseData);
            }
            else{
                console.log("There is an Error in Creating Account")
            }
        } catch (error) {
            console.error('Error creating user:', error.response ? error.response.data : error.message);

        }
    };

    return <>
        <div className="flex bg-black  w-full h-screen ">

            {/* Left Side */}
            <div className="w-1/2 bg-black p-5">
                <div className='flex rounded-3xl w-full h-full  flex-col bg-orange-300 justify-center items-center'>
                    <Image className='' src={imageSrcAlt} width={600}></Image>
                </div>
            </div>

            {/* Right Side */}
            <div className="w-1/2 px-28 py-5 space-y-5 ">

                <WebsiteName size='2xl'></WebsiteName>
                <Card className='p-10  bg-gray'>
                    <CardHeader>
                        <p className='font-extrabold text-2xl text-white'>Create a Free<span className='text-primary'> Account </span></p>
                    </CardHeader>

                    <CardBody className=''>
                        <form onSubmit={handleOnSubmit}>
                            <div className='space-y-10'>
                                <div className='flex space-x-5'>
                                    <Input className='tex-white' onChange={handleChange} startContent={<UserIcon></UserIcon>} isRequired placeholder='FirstName' name='firstName' color='white' label="FirstName" labelPlacement='outside'></Input>
                                    <Input className='tex-white' onChange={handleChange} startContent={<UserIcon></UserIcon>} isRequired placeholder='LastName' name='lastName' color='white' label="LastName" labelPlacement='outside'></Input>


                                </div>
                                <Input className='tex-white' onChange={handleChange} startContent={<AtIcon></AtIcon>} isRequired placeholder='Enter Email Address' name='email' color='white' label="Email" labelPlacement='outside'></Input>
                                <Input className='tex-white' onChange={handleChange} startContent={<PhoneIcon></PhoneIcon>} isRequired placeholder='Enter Phone Number' name='phone' color='white' label="Phone Number" labelPlacement='outside'></Input>

                                <PasswordInput
                                    value={formData.password}
                                    onChange={(value) => handleChange({ target: { name: 'password', value } })}
                                />
                            </div>
                            <Button fullWidth className='bg-primary my-10 text-white font-semibold' type='submit'>Create an CommUnity Account</Button>
                        </form>
                        <div>

                            <div className='font-semibold py-3 text-white text-center'>Already have an Account?
                                <Button className='text-primary bg-transparent' onClick={() => {
                                    navigate('/signin')
                                }} endContent={<ArrowRight></ArrowRight>}>Sign in</Button></div>

                            <div className='flex justify-between'>
                                <Button startContent={<GoogleIcon></GoogleIcon>} className='bg-black text-white font-semibold hover:bg-primary'>Sign up with Google</Button>
                                <Button startContent={<AppleIconWhite></AppleIconWhite>} className='bg-black text-white font-semibold hover:bg-primary' >Sign up with AppleID</Button>
                            </div>
                        </div>
                    </CardBody>

                    <CardFooter>
                        <p className='text-white font-semibold'>By proceeding, you agree to the <span className='text-primary underline font-semibold'>Terms and Conditions</span> and <span className='text-primary underline font-semibold'>Privacy Policy</span></p>
                    </CardFooter>
                </Card>
            </div>



        </div>
    </>
}