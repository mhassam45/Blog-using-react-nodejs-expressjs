import React, {Component} from 'react'
import { response } from 'express'

class Posts extends Component{
    constructor(){
        super()
        this.state ={
            recentPosts:[]
        }
    }

    componentDidMount(){
        console.log('componentDidMount')
        fetch('./api/post')
        .then(response => {
            return response.json()
        })
        .then(payload => {
            console.log('POSTs = ' + JSON.stringify(payload))
            if(payload.confirmation != 'success'){
                throw new Error('somthing went wrong')
                return
            }
            const posts = payload.data
            //console.log('POSTs = ' + JSON.stringify(data))
            this.setState({
                recentPosts:posts
            })
        })
        .catch(err => {
            console.log('ERROR - ' + err.message)
        })
    }

    render(){
        return(
            <div>
                <h1>Recent Posts</h1>
                <ul style={{listStyle:'none'}}>
                    { this.state.recentPosts.map(post =>{
                        return(
                            <li key={post.id}>
                                <div style={{display:'flux' , marginBottom:16}}>
                                    <a href={'/post/'+post.slug} >
                                        <img style={{marginRight:12}} src={post.image +'-s160-c'}/>
                                    </a>
                                    <div>
                                        <small>{post.dateString}</small>
                                        <a href={'/post/'+post.slug}>
                                            <h3 style={{marginTop:0}}>{post.title}</h3>
                                        </a>
                                        <p>{post.preview}</p>
                                        <a style={{color:'red'}} href={'/post/'+post.slug}>Read More</a>
                                    </div>
                                </div>
                            </li>
                        )
                    })


                    }
                </ul>
            </div>
        )
    }

}

export default Posts