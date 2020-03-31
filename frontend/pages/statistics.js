import React from "react";
import Layout from "../components/Layout";
import {fetchAuth} from "../services/Fetch.service";

const Statistics = ({user}) => {
    return (
        <Layout user={user}>
        </Layout>
    )
};
Statistics.getInitialProps = async ctx => {
    try {
        const {data} = await fetchAuth(ctx).get('/users/me');

        return {
            user: data.user || {}
        };
    } catch (err) {
        if (ctx.req) {
            // If `ctx.req` is available it means we are on the server.
            ctx.res.writeHead(302, {Location: '/signin'})
            ctx.res.end()
        } else {
            // This should only happen on client.
            Router.push('/signin')
        }
    }
};
export default Statistics;