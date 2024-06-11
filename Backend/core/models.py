from django.db import models


class User(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    is_vendor = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name
    
class Vendor(models.Model):
    user = models.OneToOneField(User, related_name='vendors', on_delete=models.CASCADE)
    bio = models.TextField()
    contact_details = models.TextField()
    bank_details = models.TextField()
    shipping_policy = models.TextField()
    return_policy = models.TextField()
    
    def __str__(self):
        return self.user
    
    

class Category(models.Model):
    name = models.CharField(max_length=255)
    slug= models.SlugField(max_length=255, unique=True)
    parent = models.ForeignKey('self',on_delete=models.CASCADE, null=True, blank=True, related_name='subcategories')
    description = models.TextField(blank=True, name=True)
    
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
    
    
    def __str__(self):
        return self.name
    
    
class Product(models.Model):
    vendor = models.ForeignKey(Vendor, related_name='products', on_delete=models.CASCADE)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()    
    img = models.ImageField(upload_to='product')
    