import { async } from '@firebase/util';
import { arrayRemove, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase.config';
import {getStorage, ref, getDownloadUrl, uploadBytesResumable, deleteObject} from "firebase/storage";
import { messaging } from '../../firebase.config';
import { getToken } from 'firebase/messaging';

const order = () => {
    const [orderData, setOrderData] = useState();

    //1. reflect live changes like delete add update of collection into the component or show the collection data
    // a.reference of the collection location 

    const orderCollectionRef =  collection(db, "Orders");
    useEffect(()=>{
        const unsubscribe = onSnapshot(orderCollectionRef, snapshot => {
            setOrderData(snapshot.docs.map(doc=>({...doc.data(), id: doc.id,})))
        })

        return () => {
            unsubscribe();
        }
    })


    //2. show the perticular collection with sortinh data in another way
    const fetchOrderData = async() => {
        try{
           const petsCollectionRef = collection(db, "Orders");
           await getDocs(query(petsCollectionRef, orderBy("createdAt", "desc")))
           .then((querySnapshot)=>{
            const newData = querySnapshot.docs.map((doc)=>({
                ...doc.data(),
                id: doc.id,
            }));
            setOrderData(newData);
           })
           
        }catch(err){
            console.log(err);
        }
    }

    //3. update data into existing collection
    const updateData = async(data) => {
        const collectionRef = doc(db , "event", data.id);
        try{
            await updateDoc(collectionRef,{
                id:data.id,
                name:data.name,
                email:data.email,
            })
        }catch(err){
            console.log(err);
        }
    } 

    //4. delete a perticular collection
    const collectionRef = doc(db, "Products", id);
    const deleteCollection = async(id) => {
        try{
            await deleteDoc(collectionRef);
        }catch(err){
            console.log(err);
        }
    }

    //5. Delete a perticular field from collection
    const deleteField = async (id, url) => {
        try{
            await updateDoc(collectionRef,{
                productImages:arrayRemove(url),
                //set current time with timestamp using Timestamp
                modifiedAt: Timestamp.fromMillis(Date.parse(new Date())),
            })
        }catch(err){}
    }

    //6. upload image into firebase and generate url
    const storage = getStorage();
    const imageAsFile = (e) => {
        e.preventDefault();
        // for uploading single file 
        const img = e.target?.files[0];
        const storageRef = ref(storage, `Admin/images/${img.lastModified + img.name}`);
        const uploadTask = uploadBytesResumable(storage,img);

        uploadTask.on("state_changed",
        (snapshot)=>{
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
        },
        (err) =>{},
        ()=>{
            getDownloadUrl(uploadTask.snapshot.ref).then((downloadUrl)=>{
                console.log(downloadUrl);
            })
        }
        )
    }

    //7. get Timestamp time format in component using moment library
    {moment(item?.event_time[0]?.seconds * 1000 + item?.event_time[0]?.nanoseconds/1000000).format("MMM-DD-YYYY HH:mm")}

    //8.delete image url from storage
    const deleteImageFromStorage = async(url) => {
        // if there are multile images 

        img.map(async(item)=>{
            let str = item;

            const imgName = str.slice(
                str.indexOf("images%2F") + 9,
                str.lastIndexOf("?")
            );

            const imgRef = ref(storage, `Admin/images/${imgName}`);
            
            await deleteObject(imgRef).then(()=>{
                console.log("image Deleted Successfully");
            }).catch((err)=>{
                console.log(err)
            })
        })
    }

    //9. send push notification to users using api and its fcm token
    const reactFirebaseServerKey = ""
    const FCMToken = ""
    const handleNotification = (status, token, item) =>{
        const headers = {
            "Content-Type":"application/json",
            "Authorization":"key="+reactFirebaseServerKey,
        };

        const data = {
            to:FCMToken,
            notification: {
                body:"Notification body",
                title:"Notification Title",
                subtitle:"Notification subtitle",
            },
        };

        axios.post("https://fcm.googleapis.com/fcm/send",data,{
            headers:headers,
        }).then((response)=>{console.log(response)})
        .catch((err)=>{console.log(err)})
    }

    //10. allow notification access to device and generate FCM Token
    const webPushcertificationKey = "";
    function requestPermission() {
        console.log("Requesting Permission");
        Notification.requestPermission().then((permission)=>{
            if(permission === 'granted'){
                console.log("Notification Permission Granted");
                getToken(messaging, {vapidKey:webPushcertificationKey })
                .then((currentToken)=>{
                    if(currentToken){
                        console.log(currentToken);
                    }
                })
            }else{
                console.log("Do not have permission")
            }
        })
    }
  return (
    <div>
      
    </div>
  )
}

export default order
