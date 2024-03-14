import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonIcon, IonSearchbar, IonCard, IonSegment, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonAvatar, IonImg, IonChip, useIonAlert, useIonToast, IonRefresher, IonRefresherContent, IonSkeletonText, IonModal, IonButton, IonSegmentButton, IonDatetime } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { trashBinOutline } from 'ionicons/icons';
import './List.css'

const List: React.FC = () => {

    const [user, setUser] = useState([]);
    const [laoding, setloading] = useState(true)
    const [showAlert] = useIonAlert()
    const [showToast] = useIonToast();
    const [selected, setselected] = useState(null)
    const modal = useRef<HTMLIonModalElement>(null);
    const [element, setElement] = useState("details                         ")
    const page = useRef(null)


    // useEffect(()=>{
    //     setelement(page.current)
    // },[])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await getUser();
                setUser(users);
                // console.log(users)
                setloading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const getUser = async () => {
        const data = await fetch('https://randomuser.me/api?results=10');
        const user = await data.json()
        return user.results
    }

    const clear = () => {
        showAlert({
            header: 'Confirm!',
            message: 'Sure About deleting the User?',
            buttons: [
                { text: 'Cancle', role: 'cancel' },
                {
                    text: 'Delete', handler: () => {
                        setUser([]);
                        showToast({
                            message: 'All users deleted',
                            duration: 2000,
                            color: 'danger'
                        })
                    }
                }
            ]
        })
    }

    const doRefresh = async (event: any) => {
        const data = await getUser();
        setUser(data)
        event.detail.complete();
    }

    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar color={'success'}>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle slot='start'>Items</IonTitle>
                        <IonButtons slot="end">
                            <IonButtons onClick={clear}>
                                <IonIcon slot="start" icon={trashBinOutline} />
                            </IonButtons>
                        </IonButtons>
                    </IonToolbar>
                    <IonToolbar color={'success'}>
                        <IonSearchbar />
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonRefresher slot="fixed" onIonRefresh={(ev) => doRefresh(ev)}>
                        <IonRefresherContent />
                    </IonRefresher>

                    {laoding && (
                        [...Array(10)].map((_, index) => (
                            <IonCard key={index}>
                                <IonCardContent className='ion-no-padding'>
                                    <IonItem lines='none'>
                                        <IonAvatar slot='start'>
                                            <IonSkeletonText />
                                        </IonAvatar>
                                        <IonLabel>
                                            <IonSkeletonText animated style={{ width: '1' }} />
                                            <p>
                                                <IonSkeletonText />
                                            </p>
                                        </IonLabel>
                                        <IonChip slot='end' color={'primary'}>

                                        </IonChip>
                                    </IonItem>
                                </IonCardContent>
                            </IonCard>
                        ))
                    )}

                    {/* <IonCardHeader>
                        <IonCardTitle>Test</IonCardTitle>
                        </IonCardHeader>
                    <IonCardContent>abcd</IonCardContent> */}

                    {user.map((item, index) =>
                        <IonCard key={index} onClick={() => setselected(item)}>
                            <IonCardContent className='ion-no-padding'>
                                <IonItem lines='none'>
                                    <IonAvatar slot='start'>
                                        <IonImg src={item.picture.thumbnail} />
                                    </IonAvatar>
                                    <IonLabel>
                                        {item.name.first} {item.name.last}
                                        <p>{item.email}</p>
                                    </IonLabel>
                                    <IonChip slot='end' color={'primary'}>
                                        {item.nat}
                                    </IonChip>
                                </IonItem>
                            </IonCardContent>
                        </IonCard>
                    )}
                    {/* breakpoints={[0,0.5,0.8,1]} initialBreakpoint={0.5} */}
                    <IonModal ref={modal} isOpen={selected !== null} onIonModalDidDismiss={() => setselected(null)}>
                        <IonHeader>
                            <IonToolbar color={'light'}>
                                <IonButtons slot='start'>
                                    <IonButton onClick={() => modal.current?.dismiss()}>
                                        Close
                                    </IonButton>
                                </IonButtons>
                                <IonTitle>{selected?.name.last}</IonTitle>
                            </IonToolbar>
                            <IonToolbar color={'light'}>
                                <IonSegment value={element} onIonChange={(e) => setElement(e.detail.value)}>
                                    <IonSegmentButton value='details'> Details</IonSegmentButton>
                                    <IonSegmentButton value='calendar'>Calendar</IonSegmentButton>
                                </IonSegment>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent className='ion-padding'>
                            {element === 'details' && (
                                <IonCard>
                                    <IonAvatar slot='start'>
                                        <IonImg src={selected?.picture.large} />
                                    </IonAvatar>
                                    <IonCardContent className='ion-no-padding'>
                                        <IonItem lines='none'>
                                            <IonLabel class='ion-text-wrap'>
                                                {selected?.name.first} {selected?.name.last}
                                                <p>{selected?.email}</p>
                                            </IonLabel>

                                        </IonItem>
                                    </IonCardContent>
                                </IonCard>
                            )}
                            {element === 'calendar' && (<IonDatetime />)}
                        </IonContent>
                    </IonModal>
                </IonContent>
            </IonPage>
        </>
    );
};

export default List;