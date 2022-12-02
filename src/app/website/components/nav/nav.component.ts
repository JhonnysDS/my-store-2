import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/product.model';

import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  counter = 0;
  token = '';
  profile: User |null = null;
  categories: Category[] = []

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private usersService: UsersService

  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length
    })

    this.getAllCategories();
  }
  activeMenu = false;
  
  
  toggleMenu(){
    
    this.activeMenu = !this.activeMenu;

  }


  getProfile(){
    this.authService.profile(this.token)
    .subscribe(User => {
      this.profile = User;
    })
  }

  login(){
    this.authService.login('kalel@mail.com','1212' )
    .subscribe(rta=>{
      this.token = rta.access_token;
      console.log(rta)
    })
  }

  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data
    }

    )
  }

  createUser(){
    this.usersService.create({
      name: 'kalel',
      email: 'kalel@mail.com',
      password: '1212',
      role: 'customer'
    })
    .subscribe(rta=>{
      console.log(rta)
    })
  }

}
