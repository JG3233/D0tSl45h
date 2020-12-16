import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import axios from 'axios'

// concept adapted from: https://jacobwicks.github.io/2020/06/19/rendering-markdown-and-resizing-images-with-react-markdown.html#:~:text=React%2DMarkdown%20doesn't%20provide,100%20and%20height%20to%20200%20!
const renderers = {
    //This custom renderer changes how images are rendered
    //we use it to constrain the max width of an image to its container
    image: ({
        alt,
        src,
        title,
    }) => (
        <img 
            alt={alt} 
            src={src} 
            title={title} 
            style={{ maxWidth: '60vw' }}  />
    ),
};

//file to allow users to view a writeup 
export default class ViewPosts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            title: '',
            content: '',
        }

    }

    // get data for this writeup
    componentDidMount() {
        axios.get('http://localhost:5000/posts/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    title: res.data.title,
                    content: res.data.content
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    // show the writeup, render in md with special image rendering
    render() {
        return (
            <div>
                <h3 className='text-primary'>{this.state.username}'s Post</h3>
                <div>
                    <label className='font-weight-bold'>Title: </label>
                    <p>{this.state.title}</p>
                </div>
                <div>
                    <p className='font-weight-bold'>Content: </p>
                    <ReactMarkdown className='p-3 rounded border border-primary bg-dark text-light' 
                    plugins={[gfm]} renderers={renderers}>
                        {this.state.content}
                    </ReactMarkdown>
                </div>
            </div>
        )
    }
}