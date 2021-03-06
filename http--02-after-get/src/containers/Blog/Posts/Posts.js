
import React, { Component } from 'react';
//import axios from 'axios';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import { withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';
class Posts extends React.Component
{
    state = {
        posts: [],

    }
    componentDidMount()
    {
        console.log(this.props);
        axios.get('/posts/')
            .then(response =>
            {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post =>
                {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({ posts: updatedPosts });
                // console.log( response );
            })
            .catch(error =>
            {
                console.log(error);
                // this.setState({ error: true });

            });
    }
    postSelectedHandler = (id) =>
    {
        //this.setState({ selectedPostId: id });
        //this.props.history.push('/' + id);
        this.props.history.push({ pathname: '/' + id });
    }
    render()
    {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong! </p>
        if (!this.state.error)
        {
            posts = this.state.posts.map(post =>
            {
                return (
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        {...this.props.match}
                        clicked={() => this.postSelectedHandler(post.id)} />
                )
                // <Link to={'/' + post.id} key={post.id}>

                // </Link>;
            });
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default withRouter(Posts);//add the containing information for the nearest loaded route