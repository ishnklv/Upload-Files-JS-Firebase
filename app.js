import firebase from 'firebase/app'
import 'firebase/storage'
import {upload} from "./upload.js"


const firebaseConfig = {
    apiKey: "AIzaSyBbmbPnwQ1NFJSfOW-2zTzLZCuGsvvRGtU",
    authDomain: "fe-upload-199b8.firebaseapp.com",
    projectId: "fe-upload-199b8",
    storageBucket: "fe-upload-199b8.appspot.com",
    messagingSenderId: "43174525883",
    appId: "1:43174525883:web:59c0d058b29250efeae29e"
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()


upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percentage
                block.style.width = percentage
            }, error => {
                console.log(error)
            }, () => {
                task.snapshot.ref.getDownloadURL().then(url => {
                    console.log('Url', url)
                })
            })
        })
    }
})