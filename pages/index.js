import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList';


function HomePage(props){
    return(
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta 
                    name='description'
                    content = 'Browse a huge list of highly active React meetups!'
                />
            </Head>
            <MeetupList meetups={props.meetups}/>
        </Fragment>
           
    );
}



// export async function getServerSideProps(context){
//    const req = context.req;
//    const res = context.res;
//     //fetch data from an API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps(){
    
    const client = await MongoClient.connect('mongodb+srv://sharmasakshi3114:sakshi3114@cluster0.7jrlz.mongodb.net/meetups');

    const db =  client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();
    
    //fetch data from API
    return {
        props: {
            meetups: meetups.map(meetup=> ({
                title:meetup.title,
                address:meetup.address,
                image:meetup.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 1
    };
}


export default HomePage;