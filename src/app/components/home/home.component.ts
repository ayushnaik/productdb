import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../Category';
import { Products } from './../../Products';
import { HttpService } from 'src/app/services/http.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() categor: Category = new Category;
  @Input() product: Products = new Products;
  @Output() categoryItemEmitter = new EventEmitter<any>();
  @Output() productItemEmitter = new EventEmitter<any>();

  public categoryName!: String;
  public category: Category = new Category;
  public hasError = false;
  public errorMessage!: string;
  public prodName!: String;
  public prodPrice!: Number;
  public catName: String = "";
  public products: Products = new Products;
  public catId!: String;
  public productss: Products[] = [];
  public categories: Category[] = [];
  public selected: String = "";
  form: FormGroup;

  constructor(private httpservice: HttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      categories: ['']
    });
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllProduct();
    this.httpservice.getAllCategory();
  }

  validate() {
    if (!this.category) {
      this.hasError = true;
      this.errorMessage = "Cannot submit the empty content.";
    }
  }

  addCategory() {
    this.validate();
    if (!this.hasError) {
      const newCategory = new Category();
      newCategory.categoryName = this.categoryName;
      this.httpservice.postCategory(newCategory);
      this.getAllCategory();
    }
  }

  addProduct() {
    this.validate();
    if (!this.hasError) {
      const newProducts = new Products();
      newProducts.prodName = this.prodName;
      newProducts.prodPrice = this.prodPrice;
      newProducts.catName = this.catName;
      this.httpservice.postProduct(newProducts);
      this.getAllProduct();
    }
  }

  getAllCategory() {
    this.httpservice.getAllCategory().subscribe((categories: Category[]) => {
      this.categories = categories;
      console.log(this.categories);
    });
  }

  getAllProduct() {
    this.httpservice.getAllProduct().subscribe((productss: Products[]) => {
      this.productss = productss;
      console.log(this.productss);
    });
  }

  onCategoryChange(_id: String) {
    return this.catName = _id;
  };

  updateCategory(category = new Category()) {
    this.validate();
    if (!this.hasError) {
      category.categoryName = this.categoryName;
      this.httpservice.updateCategory(category);
      this.getAllCategory();
    }
  }

  updateProduct(product = new Products()) {
    this.validate();
    if (!this.hasError) {
      product.prodName = this.prodName;
      product.prodPrice = this.prodPrice;
      product.catName = this.catName;
      this.httpservice.updateProduct(product);
      this.getAllProduct();
    }
  }

  delCategory(catId: String) {
    this.httpservice.delCategory(catId).subscribe(
      (resp: any) => {
        console.log('Deleted succesfully');
        this.getAllCategory();
      },
      err => console.log(err)
    )
  }

  delProduct(productId: String) {
    this.httpservice.delProduct(productId).subscribe(
      (resp: any) => {
        console.log('Deleted succesfully');
        this.getAllProduct();
      },
      err => console.log(err)
    )
  }

  refreshStoreList() {
    this.productItemEmitter.emit();
    this.categoryItemEmitter.emit();
  }

}
