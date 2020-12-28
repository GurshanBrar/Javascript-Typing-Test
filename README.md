---
---
name: 'Javascript Typing Test'
description: 'A Typing Test website built with HTML, CSS, and Javascript'
author: '@GurshanBrar'
img: 'https://cloud-gny03pu07.vercel.app/0javascript_typing_test_cover.png'
---

### First up, the project
Obviously we need to know what we'll build before starting the workshop, so here's the [final demo](https://js-typing-test-final.gurshanbrar.repl.co/) and the [final code](https://repl.it/@GurshanBrar/Javascript-Typing-Test-Final). These images show our final project:

![Screenshot of the final site for the test portion](https://cloud-1v9gb7z3j.vercel.app/0javascript_typing_test_final_image_1.png)

![Screenshot of the final site for the results portion](https://cloud-1v9gb7z3j.vercel.app/1javascript_typing_test_final_image_2.png)

### Prerequisites
This project will be more fun to code if you have a general understanding of HTML, CSS, and Javascript. However don't worry if you don't because you can definitely complete this workshop without any prerequisites.

### Focus
Yes, **focus**. JK. This workshop will focus on Javascript, so you'll have a starter template including HTML and CSS that will be explained.

### The IDE
An IDE (Integrated Development Environment) is just fancy speak for where your code will run. We'll be using [repl.it](https://repl.it) as our IDE because...  
1. It saves your code in the cloud
2. All you need is an internet connection and a web browser
3. It's really easy to fork (copy) from

## Let's start!

### Step 0: Forking the starter repl
To fork (copy) the starter template,
1. Navigate to the [Starter Template](https://repl.it/@GurshanBrar/Javascript-Snake-Starter#index.html)
2. Edit anything and the template will be copied as one of your repls
3. Click on the run button to run the website, and click on the "open in a new tab" button on the right of the url inside the repl's output.

You can make a change now, like changing the page's title in the ```<title>``` tag or adding a random space. Another option is to wait until we start coding Javascript!

### Step 1: Explaining the starter template
To explain the starter template, I'll go over the HTML, CSS, and Javascript files one by one

#### The HTML file
HTML stands for **Hyper Text Markup Language** and is used for defining the **basic structure and content** of a web page. HTML consists of opening tags followed by closing tags. Inside the two tags, we add in our content. We use HTML to define a ```<div>``` (container) for our typing test and ```<span>```/```<ul>``` elements for the individual letters, and the results. Now lets go over it!
- ```html <!DOCTYPE html>``` tells the browser to render the file as an HTML document
- Inside ```<html lang="en">``` is where all of our content goes
- Inside the ```<head>``` tag is where content that is more geared towards accessiblity, metadata, and the title. It is not visible on the page, except for the title.
- Finally, the ```<body>``` houses the visible part of our program and everthing that is rendered on page load. We add Javascript after definining our HTML elements to avoid errors orginiating from accidently accessing an HTML element before it has been loaded, and to make our pages load vital components first.

This is the basic overview of an HTML document. Now lets dive into our ```<head>``` tag!

First up is the ```<title>``` tag. This tag simply takes text and helps web browsers display it above the search bar. You can see where it is displayed in this screenshot:

![Screenshot showing where the ```<title>``` tag is shown](https://cloud-dv408c6c4.vercel.app/0javascript_typing_test_title_demo.png)

I've called Typing Test, but you can call it whatever. These ```<meta>``` tags: 
```html
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
``` 
are additions to any web page that should always be included. The first line tells the browser that the character [encoding](http://net-informations.com/q/faq/encoding.html) of characters used inside the webpage is [utf-8](https://www.fileformat.info/info/unicode/utf8.htm). This means that we can use the extensive set of characters this encoding provides and is important for the browser to know. 

The second line is used for proper viewport configuration on mobile devices. The ```name``` tag tells us that we are referring to the viewport. ```content="width=device-width``` tells the browser to set the page width to the on-screen width of the device, and ```initial-scale=1``` means to set the initial zoom level to 1.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous" />
<link rel="stylesheet" href="style.css" />
```
These two ```<link>``` tags define CSS stylesheets that are being linked to our page. The ```rel``` attribute is an HTML attribute meaning it adds more functionality to HTML elements. In this case, it defines the purpose of the link attribute which is to link a CSS "stylesheet". Furthermore, the ```href``` attribute defines the url of the stylesheet. The first tag refers to a CSS framework we'll use called [bootstrap](https://getbootstrap.com/). It links to their stylesheet and allows us to use their styles. Our stylesheet is local on the filesystem, so we can give it a link of "style.css".

We can look into the ```<body>``` tag now. Starting off with our title and subtitle, we have this:
```html
<div class="intro">
    <h1 class="intro-heading">Typing Test</h1>
    <p class="font-weight-light intro-text">
        This is a typing speed test! Type a letter to begin.
    </p>
</div>
```
Looking into this, we see a ```<div>``` element. A ```<div>``` element is simply a box that contains other elements. It's used to group elements, and also as literal boxes. ```id``` and ```class``` are two HTML attributes that we wil luse. ```id``` means that the element has a unique identifier used for referencing the element in CSS and Javascript. ```class``` is the same thing, but it allows multiple elements to fall under the same identifier. In this case we use ```class```.

Inside the ```<div>``` there is an ```<h1>``` and a ```<p>```. The ```<h1>``` tag defines an HTML heading. The ```<p>``` tag represents a text. 

You can see how we have a weird class called ```font-weight-light```. Well it turns out, there's another great property of ```class``` in our case. Remember that Bootstrap stylesheet we used? That stylesheet contains custom styles that are referenced under class names. Using those class names in our HTML will allow the stylesheet to select our element and the styles will be applied. 

Therefore, a class we use is [```font-weight-light```](https://getbootstrap.com/docs/4.5/utilities/text/#font-weight-and-italics). This class means that the text will have a *light* look and feel to it. It allows us to create different styles very easily and we don't have to code any CSS for this purpose!

To create the container to hold our text for typing, we use this code:
```html
<div id="main" class="container main">
		<div class="text-container" id="text-container"></div>
	</div>
```
We use a simple ```<div>``` with the bootstrap class [```container```](https://getbootstrap.com/docs/4.5/layout/overview/#containers). ```container``` just means that our box will resize properly and look good on all devices. Inside that we have another ```<div>``` to hold our actual text. 

Now you may have some questions...
1. **Why do we have so many ```id``` and ```class``` names?**. We have these because we will use them later on to reference our HTML elements in our CSS stylesheet and our Javascript.`
2. **Why isn't there any text inside ```<div class="text-container" id="text-container"></div>```?**. As for the text, what we'll do is use Javsacript to add a bunch of ```<span>``` elements into this container. Our text will be in the Javascript file and each letter of the text will consist of a ```<span>``` element with the letter inside. This way we can dynamically change the color of each individual letter.

The final ```<div>``` we have is this:
```html
<div class="results-container" id="results">
```
This ```<div>``` is used to contain our results. At first it is not visible, but we can change that with Javascript. It centers them using a CSS stylesheet (which I'll get to later). Inside this is a [bootstrap unordered list](https://getbootstrap.com/docs/4.5/components/list-group/) with its bullet points automatically removed. 

Inside this are many ```<li>```(list elements) that contain the results. Inside three of these ```<li>``` elements are ```<span>``` elements. What ```<span>``` means is inline text meaning that it doesn't add a line break between each element like ```<p>``` does. Therefore we can have two on one line, and use Javascript to fill in the results. We add a [```flex```](https://getbootstrap.com/docs/4.5/utilities/flex/) property on the ```<li>``` elements for horizontal alignment of our ```<span>``` elements.

#### The CSS File
CSS stands for Cascading Style Sheets and defines how the HTML elements look to the user. A CSS *block* looks like this:
```css
selector {
  property: property value
}
```
You can select an element to apply styles to, or select a class/id name. This is why we added so many ids and classes to our elements! 

Look at *style.css*. Inside that file, we apply styles that pertain to our HTML elements. First, we add a ```--nav-color``` variable to :root to define a single color. We center align our introduction text and add ```margin``` properties. In CSS, every element can have a ```margin```, a ```border```, some ```padding```, and content. These properties are all part of the CSS [box model](https://www.w3schools.com/css/css_boxmodel.asp) which define how an element looks on the page. Here is an image to illustrate:

![Image explaining the box model](https://cloud-jvqp47ln2.vercel.app/0box_model_demo.png)

```margin``` is the space around an element, and ```padding``` is the space between the ```border``` and the content. Therefore, to create spacing we use these properties. On our ```.main``` ```<div>```, we set a ```border-radius``` to round off the border, add a ```background-color```, and put a shadow around the ```<div>``` to make it pop out while adding padding. ```.char``` and ```.space``` are classes set to the future ```<span>``` elements we will add into our container. These control the padding and font size to make the letters look good.
    
