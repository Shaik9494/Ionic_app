import { useIonRouter,IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import React, { useState,useEffect } from 'react';
import { construct, logInOutline, personAddOutline } from 'ionicons/icons'
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import Logo from '../Assest/logo.png'
import Intro from '../components/Intro';
import { Preferences } from '@capacitor/preferences';
import { Router } from 'react-router';

const Login: React.FC = () => {
    const router=useIonRouter();

    const [intro,setIntro]=useState(false);
    const [present,dismiss]=useIonLoading()


    const Intro_key="done"

    useEffect(()=>{
        const checkstorage=async()=>{
            const seen=await Preferences.get({key:Intro_key})
            console.log(seen)
            setIntro(seen.value==='true')
        }
        checkstorage();
    },[])


    const login =async (event: any) => {
        event.preventDefault()
        console.log("login")
        await present('Logging In')
        setTimeout(async()=>{
            dismiss();
            // forward means the transition from one page to another root mean fixed no going any where
        router.push('/menu','root')
        },3000)
        
    }

    const finishintro= async ()=>{
        setIntro(true)
        Preferences.set({key:Intro_key,value:'true'});
    }

    return (
        <>
        {!intro?(<Intro onFinish={finishintro}/>):(
            <IonPage>
                <IonHeader >
                    <IonToolbar>
                        <IonTitle >Login</IonTitle>
                    </IonToolbar>
                </IonHeader>


                <IonContent className="ion-padding" scrollY={false}>
                    <div className='ion-text-center ion padding'>
                        <img src={Logo} alt="logo" width={'50%'} />
                    </div>
                    <IonCard>
                        <IonCardContent>
                            <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <IonInput label="Email" placeholder="Enter Email" type='email' value="" labelPlacement='floating' clearOnEdit={true} fill='outline' clearInput={true}></IonInput>
                                <IonInput label="Password" type="password" value="" placeholder='Enter Password' labelPlacement='floating' clearOnEdit={true} fill='outline'></IonInput>
                                <IonButton className='ion-margin-top' type='submit'>
                                    Login
                                    <IonIcon icon={logInOutline} slot='start' />
                                </IonButton>
                                <IonButton className='ion-margin-top' color='secondary' routerLink='/register' type='button'>
                                    Create Account
                                    <IonIcon icon={personAddOutline} slot="start" />
                                </IonButton>
                            </form>
                        </IonCardContent>
                    </IonCard>
                </IonContent>



                {/* <IonFooter>
                <IonToolbar>footer</IonToolbar>
            </IonFooter> */}
            </IonPage>)}
        </>
    );
};

export default Login;