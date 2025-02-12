//our-domain.com/new-meetup

import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

function NewMeetup(){
    const router = useRouter();

async function AddMeetupHandler(eneteredMeetupData){
       const response = await fetch('/api/new-meetup',{
        method:'POST',
        body: JSON.stringify(eneteredMeetupData),
        headers:{
            'Content-Type' : 'application/json'
        }
       });

       const data = await response.json();

       console.log(data);
       router.push('/');

    }

    return(
        <Fragment>
            <Head>
                <title>New Meetup Form</title>
                <meta
                    name="description"
                    content="Add ypur own meetups"
                />
            </Head>
            <NewMeetupForm onAddMeetup= {AddMeetupHandler}/>
        </Fragment>
        
    );
}

export default NewMeetup;