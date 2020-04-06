import React, {Component} from 'react';
import Layout from "../components/Layout";
import TrumpFaces from "../components/TrumpFaces";
import styled from 'styled-components';
import {fetchAuth} from "../services/Fetch.service";
import Router from 'next/router';

const Home = ({user}) => {
    return (
        <Layout user={user}>
            <Header>What mood today?</Header>
            <TrumpFaces/>
        </Layout>
    )
};

const Header = styled.h1`
text-align: center;
`;

Home.getInitialProps = async ctx => {
    try {
        const {data} = await fetchAuth(ctx).get('/users/me');

        return {
            user: data.user || {}
        };
    } catch (err) {
        if (ctx.req) {
            // If `ctx.req` is available it means we are on the server.
            ctx.res.writeHead(302, {Location: '/signin'});
            ctx.res.end();
        } else {
            // This should only happen on client.
            Router.push('/signin')
        }
    }
};
export default Home;
