import React from 'react';
import Layout from "../components/Layout";
import {fetchAuth} from "../services/Fetch.service";
import Chart from '../components/Chart';
import Router from 'next/router';

const Statistics = ({user, votes}) => {

    return (
        <Layout user={user}>
            <Chart/>
        </Layout>
    )
};

Statistics.getInitialProps = async ctx => {
    try {
        const {data} = await fetchAuth(ctx).get('/users/me');
        return {
            user: data.user || {},
        };
    } catch (err) {
        if (ctx && ctx.req) {
            // If `ctx.req` is available it means we are on the server.
            ctx.res.writeHead(302, {Location: '/signin'});
            ctx.res.end();
        } else {
            // This should only happen on client.
            Router.push('/signin');
        }
    }
};
export default Statistics;