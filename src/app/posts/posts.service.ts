import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) { }

    getPosts() {
        this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
            .pipe(map((postData)=>{
                return postData.posts.map(post=>{
                    return{
                    id:post._id,
                    title:post.title,
                    content:post.content
                }})
            }))
            .subscribe((changedPosts) => {
                this.posts = changedPosts;
                this.postsUpdated.next([...this.posts]);
            })
    }
    getPost(id:string){
        return this.http.get<{_id:string,title:string,content:string}>('http://localhost:3000/api/posts/'+id);
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }
    addPost(title: string, content: string) {
        const post: Post = { id: null, title: title, content: content }
        this.http.post<{ message: string, postId:string }>('http://localhost:3000/api/posts', post).subscribe(responseData=>{
            const Id=responseData.postId;
            post.id=Id;
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        })
    }
    updatePost(id:string,title:string,content:string){
        const post:Post={id:id,title:title,content:content}
        this.http.put('http://localhost:3000/api/posts/'+id,post).subscribe(res=>{
            const updatedPosts=[...this.posts];
            const oldPostIndex=updatedPosts.findIndex(post=>post.id===post.id);
            updatedPosts[oldPostIndex]=post;
            this.posts=updatedPosts;
            this.postsUpdated.next([...this.posts]);
        })
    }
    deletePost(postId){
        this.http.delete('http://localhost:3000/api/posts/'+postId).subscribe(()=>{
           const updatedPosts=this.posts.filter(post=> post.id!==postId)
           this.posts=updatedPosts;
           this.postsUpdated.next([...this.posts]);
        })
    }
}