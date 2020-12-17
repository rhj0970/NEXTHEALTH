import * as React from 'react';
import Head from 'next/head';

// Components
import { SiteHeader, Section, Button, Checklist, ChecklistItem } from '../components';

import HeroImage from '../static/img/main.jpeg';

export default class Index extends React.Component {
    render() {
        return (
            <div id="home">
                <Head>
                    <title>Next Health</title>
                </Head>

                <SiteHeader/>

                <Section id="hero" gridClassName="verticalCenter">
                    <div className="grid-col-5">
                        <h1 className="bigTitle">Guide to take control of your health.</h1>
                        <p className="bigParagraph" style={{marginBottom: '48px'}}>
                            With readily available content coming directly from health professionals and dieticians, we do our best to make your journey to better health as simple as possible.
                        </p>
                        <span> </span>
                        <Checklist>
                            <ChecklistItem text="Stay on top of important health information and track your progress in your personalized Next Health dashboard."/>
                            <ChecklistItem text="Everyone is different. Chat with professionals and dieticians in real-time and determine what's best for you."/>
                            <ChecklistItem text="Receive personalized work out and dietary recommendations based on your own fitness and wellness goals, as well as your day-to-day activities and meal habits."/>
                        </Checklist>

                        <Button href="/dashboard" className="black">Get started</Button>
                        <Button href="#" className="black" noBackground>Learn more</Button>
                    </div>
                    <div className="grid-col-7">
                        <img style={{width: '90%', textAlign: 'center', display: 'block', margin: '0 auto'}} src={HeroImage} />
                    </div>
                </Section>
            </div>
        )
    }
}