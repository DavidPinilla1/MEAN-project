import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service'
import { Post } from '../post.model';
import { TypeValidator } from './type.validator';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
    enteredTitle = '';
    enteredContent = '';
    public post: Post;
    isLoading = false;
    form: FormGroup;
    imagePreview: string;
    private mode = 'create';
    private postId: string;
    constructor(public postsService: PostsService, public route: ActivatedRoute) { }
    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
            }),
            content: new FormControl(null, { validators: [Validators.required] }),
            image: new FormControl(null, { validators: [Validators.required], asyncValidators: [TypeValidator] }),
        })
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.isLoading = true;
                this.postsService.getPost(this.postId).subscribe(post => {
                    this.isLoading = false;
                    this.post = { id: post._id, title: post.title, content: post.content, imagePath:null };
                    this.form.setValue({'title':this.post.title,'content':this.post.content, 'image':null})
                });
            } else {
                this.mode = 'create';
                this.postId = null;
            }
        });
    }
    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({ image: file });
        this.form.get('image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
    onSavePost() {
        //if (this.form.invalid) return;
        this.isLoading = true;
        console.log(this.form.value)
        if (this.mode === 'create') {
            this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
        } else {
            this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content)
        }
        this.form.reset();
    }
}