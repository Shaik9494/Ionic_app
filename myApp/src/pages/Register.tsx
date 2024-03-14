import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar, IonToast, IonBackButton, useIonRouter } from '@ionic/react';
import React, { useState } from 'react';
import { addCircleOutline,personCircleOutline } from 'ionicons/icons';
import Logo from '../Assest/logo.png';

const Register: React.FC = () => {
    const router=useIonRouter();
    const [name, setName] = useState('Shaik Huzair');
    const [phoneNumber, setPhoneNumber] = useState('7815891063');
    const [email, setEmail] = useState('Shaikhu3421@gmail.com');
    const [password, setPassword] = useState('Shaik12@#');
    const [showToast, setShowToast] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault();
        setShowToast(true);
        router.push('/','root')
    };

    const handlePhoneNumberChange = (e: CustomEvent) => {
        const inputValue = e.detail.value;
        const isValidPhoneNumber = /^\d{10}$/.test(inputValue);
        setPhoneNumber(inputValue);
        setIsPhoneNumberValid(isValidPhoneNumber);
    };

    const handleEmailChange = (e: CustomEvent) => {
        const inputValue = e.detail.value;
        const emailRegex = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const isValidEmail = emailRegex.test(inputValue);
        setEmail(inputValue);
        setIsEmailValid(isValidEmail);
    };

    const handlePasswordChange = (e: CustomEvent) => {
        const inputValue = e.detail.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
        const isValidPassword = passwordRegex.test(inputValue);
        setPassword(inputValue);
        setIsPasswordValid(isValidPassword);
    };

    const isFormValid = () => {
        return name !== '' && phoneNumber !== '' && email !== '' && password !== '' && isEmailValid && isPhoneNumberValid && isPasswordValid;
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {/* <IonButton color='white'>
                        <IonBackButton defaultHref='/'/>
                    </IonButton> */}
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" scrollY={true}>
                <div className='ion-text-center ion padding'>
                    <img src={Logo} alt="logo" width={'50%'} />
                </div>
                <IonCard>
                    <IonCardContent>
                        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <IonInput label="Name" placeholder="Enter Name" value={name} onIonChange={(e) => setName(e.detail.value!)} labelPlacement='floating' clearOnEdit={true} fill='outline' clearInput={true} required>
                            </IonInput>
                            <IonInput label="Phone Number" placeholder="Enter Phone Number" value={phoneNumber} onIonChange={handlePhoneNumberChange} labelPlacement='floating' clearOnEdit={true} fill='outline' clearInput={true} type='tel' required></IonInput>
                            {!isPhoneNumberValid && <p className="error-message">Please enter a valid phone number.</p>}
                            <IonInput label="Email" placeholder="Enter Email" type='email' value={email} onIonChange={handleEmailChange} labelPlacement='floating' clearOnEdit={true} fill='outline' clearInput={true}></IonInput>
                            {!isEmailValid && <p className="error-message">Please enter a valid email address.</p>}
                            <IonInput label="Password" type="password" value={password} onIonChange={handlePasswordChange} placeholder='Enter Password' labelPlacement='floating' clearOnEdit={true} fill='outline'></IonInput>
                            {!isPasswordValid && <p className="error-message">Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one symbol.</p>}
                            <IonButton className='ion-margin-top' type='submit' disabled={!isFormValid()}>
                                Register
                                <IonIcon icon={addCircleOutline} slot='end' />
                            </IonButton>
                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Register;
