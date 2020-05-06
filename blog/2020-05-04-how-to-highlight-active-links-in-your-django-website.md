---
title: How to Highlight Active Links in your Django Website
description: Here is how you can quickly highlight active links in your Django powered website.
date: 2020-05-04
published: true
topics: ['Django', 'Python']
---

# How to Highlight Active Links in your Django Website

If you happen to create websites or full web applications using frameworks or from scratch, then you have probably find yourself looking for how to mark active links as active. In Django, it is pretty simple. Here is how I do it.

## The normal way

![Home navbar](/assets/images/posts/screenshots/home-navbar.png)

Let's say you have a navbar like the one above and you want to highlight the current active link so that the user knows on which page he is now. You can easily implement that navbar with the following code (using Bootstrap):

```html
<nav class="navbar navbar-expand-md navbar-light bg-light">
  <a class="navbar-brand" href="{% url 'home' %}">E Shop</a>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="{% url 'home' %}">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{% url 'about' %}">About</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{% url 'account_signup' %}">Sign Up</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{% url 'account_login' %}">Sign In</a>
      </li>
    </ul>
  </div>
</nav>
```

What we want to do is to automatically add the CSS `active` class on the link corresponding to the current page like it is manually done here on the link to the Home page.

```html
<li class="nav-item active">
  <a class="nav-link" href="{% url 'home' %}">Home</a>
</li>
```

For that we need to have the request object in the current page. Go ahead and ensure that `django.template.context_processors.request` is included in your Django [context processors](https://docs.djangoproject.com/en/dev/ref/settings/#template-context-processors).

```python
TEMPLATES = [
  {
    # ... (truncated other options for readability)
    "OPTIONS": {
      # ...
      "context_processors": [
        "django.template.context_processors.debug",
        "django.template.context_processors.request",  # Make sure you have this line
        "django.contrib.auth.context_processors.auth",
        # ...
      ],
    },
  }
]
```

Then you can use the `request` global variable in your templates to check if the path of the current page matches the path of the link you want to display.

```html
{% url 'about' as url %}
<li class="nav-item {% if request.path == url %}active{% endif %}">
  <a class="nav-link" href="{{ url }}">About</a>
</li>
```

Now if you navigate to the about page, you will see something like this:

![About navbar](/assets/images/posts/screenshots/about-navbar.png)

Notice how the Home and About link are activated (displayed with a different color). Also notice how About link still looks activated? That's because we didn't remove the `active` class that was manually added to it. Let's update all the code of the navbar to make it more dynamic.

```html
<nav class="navbar navbar-expand-md navbar-light bg-light">
  <a class="navbar-brand" href="{% url 'home' %}">E Shop</a>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      {% url 'home' as url %}
      <li class="nav-item {% if request.path == url %}active{% endif %}">
        <a class="nav-link" href="{{ url }}">Home</a>
      </li>
      {% url 'about' as url %}
      <li class="nav-item {% if request.path == url %}active{% endif %}">
        <a class="nav-link" href="{{ url }}">About</a>
      </li>
      {% url 'account_signup' as url %}
      <li class="nav-item {% if request.path == url %}active{% endif %}">
        <a id="sign-up-link" class="nav-link" href="{{ url }}">Sign Up</a>
      </li>
      {% url 'account_login' as url %}
      <li class="nav-item {% if request.path == url %}active{% endif %}">
        <a id="log-in-link" class="nav-link" href="{{ url }}">Sign In</a>
      </li>
    </ul>
  </div>
</nav>
```

Now if we navigate to each of the links of the navbar, we will see the corresponding link displayed with a different color from the others.

Only thing I don't like about this method, you have to store the link in a variable before being able to use it in the `if` tag. After working on multiple sites where I had to do this, I created a small Django template tag called [Django Active Link](https://github.com/valerymelou/django-active-link) to do that for me.

## The easiest way

Django Active Link is pretty simple to use. First go ahead and add it to your project with:

```
$ pip install django-active-link
```

Then add it to your installed apps:

```python
INSTALLED_APPS = (
    ...
    'active_link',
    ...
)
```

To start using the template tag in your templates you need to load it first:

```html
{% load active_link_tags %}
```

Now to mark the Home menu active when the user is on the Home page, we just have to use the `active_link` tag:

```html
<li class="nav-item {% active_link 'home' 'active' %}">
  <a class="nav-link" href="{% url 'home' %}">Home</a>
</li>
```

Where `home` is the name of the route and `active` the CSS class we want to add in case there is a match. In general you can use it like this:

```html
<li class="nav-item {% active_link 'view-name' 'custom-class' %}">
  <a class="nav-link" href="{% url 'view-name' %}">Menu Item</a>
</li>
```

##  Conclusion

That's it. You can now highlight the active links in your Django application with ease. You can even do it without an exact match. Like marking the URL `/blog` active when the user is visiting the URL `/blog/categories`. Just use the `in` operator in the check:

```html
{% if '/blog' in request.path %}
```

Or rely on Django Active Link to take care of all that for you. You can find more in the [Documentation](https://django-active-link.readthedocs.io/).

Thank you for reading. I hope you found it useful.
