import MeetupDetail from "@/components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

function MeetupDetails(props){
    return(
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta
                    name="description"
                    content={props.meetupData.description}
                />
            </Head>
            <MeetupDetail 
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address} 
            description={props.meetupData.description}
            />
        </Fragment>
        
    )
    
}

export async function getStaticPaths(){

    const client = await MongoClient.connect('mongodb+srv://sharmasakshi3114:sakshi3114@cluster0.7jrlz.mongodb.net/meetups');

    const db =  client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({},{_id : 1}).toArray();

    client.close();

    return {
        fallback : blocking,
        paths: meetups.map((meetup) => ({
            params : {meetUpId : meetup._id.toString()},
    })),
    }

    
}

export async function getStaticProps(context){

    const meetUpId = context.params.meetUpId;
    const client = await MongoClient.connect('mongodb+srv://sharmasakshi3114:sakshi3114@cluster0.7jrlz.mongodb.net/meetups');

    const db =  client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetUpId) });

    client.close();

    //fetch data for single meetup

    return {
        props:{
            meetupData:{
                id:selectedMeetup._id.toString(),
                title:selectedMeetup.title,
                image:selectedMeetup.image,
                address:selectedMeetup.address,
                description:selectedMeetup.description
            }
        }

    }
}

export default MeetupDetails;