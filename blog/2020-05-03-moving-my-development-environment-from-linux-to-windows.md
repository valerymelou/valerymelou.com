---
title: Moving my web development environment from Linux to Windows
description: One month ago I did something quite unusual. I moved all my web development environment from Linux to Windows.
date: 2020-05-03
published: false
topics: ['Operating Systems']
---

# Moving my web development environment from Linux to Windows

One month ago, I did something quite unusual. I moved all my web development environment from Linux to Windows. I find it unusual because, nowadays, developers are most likely to move from Windows to Linux or to Mac OS. Me, I did it the other way and I will tell you why and how I did it.

![alt text](/assets/images/posts/linux-to-windows.png "Linux to Windows")

## Why

I will start by telling you why I migrated from Windows to Linux in the first place and why I came back to Windows later on. If you are just interested in how I did it, please skip this section and jump [right here](#how).

### Windows to Linux

I started my programmer journey 9 years ago on the Windows operating system (Windows 7 at that time). I only knew Windows back then and honestly it was great. I learned programming in Pascal and C on that OS without any issues. But then, I started web development in PHP. For that, XAMP was the perfect solution. It gave you PHP, MySQL and an Apache server all in once. Plus an administration interface for your MySQL databases. I worked with that for almost a year until I started experiencing some issues between XAMP updates and Windows. There were manual fixes for all those issues like, Copying dll files, editing Windows registry... But I found all of them hacky and didn't really enjoyed working with XAMP anymore. That was the main reason I left Windows in the first place. Lot of issues maintaining a stable development environment there.

So I started looking for alternatives. While doing that, I heard of **Ubuntu** which was really appreciated among developers. I also heard of the Linux Community and all the cool tools around it. I decided to try some of them and Ubuntu was a great place to start. The simplicity with which I installed PHP, MySQL and Apache on Ubuntu 12.04 just blew my mind at that time. It was as simple as doing `sudo apt-get install <package-name>`. Same for the updates. That's how I ended up using Ubuntu for my day to day tasks.

### Linux to Windows

Until last month, I have been using a Linux distribution on my personal computer since 2012. Over the years, I tried so many distributions. From Debian to Ubuntu, including KDE, Kali Linux and Elementary OS. I ended up using Debian for the last 4 years because, from my experience, it is most stable, less memory hungry and of course, it is the father (grand-father for some) of all those distributions.

Only problem I have with Linux distributions is that, you can have high quality software and easy maintenance but a poor user interface. Yes, that's right. It is the main reason I finally decided to quit Linux. It's true, Linux operating systems get the job done fast, well and even for free. But, I'm not just a developer. There are other things that I do on the computer like sending emails, watching movies, playing games, editing documents... To date I still find that Linux distributions suck at that. And even the distributions that succeeded don't always offer the most enjoyable user interfaces.

So last month, when I got a new computer, instead of installing Debian like I was planning to do, I decided to keep the Windows 10 operating system that came with it. I managed to install all the tools I need as a web developer, without any issue. Keep reading if you would like to know how.

## How

As a web developer, there are some tools that I cannot go by without them. I can classify them in the following categories:

- Editors
- Version Control Software
- Programming languages
- Frameworks
- Databases
- Prototyping & Design
- Browsers

I have one or two favorite tools for each of those. Let's see how I installed them on Windows.

### Editors

Even on Linux, I only had one Editor: [Visual Studio Code](https://code.visualstudio.com). Getting it on Windows it is straightforward. Just go ahead on to their [download page](https://code.visualstudio.com/download) and chose the Windows installer of your choice. Once the download completes, launch the installer and follow the instructions (one of the joys of Windows :-).

After installing Visual Studio Code, I usually install a set of extensions that I rely to be more effective:

| Extension                | Purpose                                           |
| ------------------------ | ------------------------------------------------- |
| [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) | To check the spelling when I code |
| [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) | This extension provides a rich editing experience for Angular templates, both inline and external templates |
| [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) | To debug JavaScript in the Chrome Browser |
| [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) | Great support for editing dotenv files |
| [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) | To integrate ESLint JavaScript into VS Code |
| [gitignore](https://marketplace.visualstudio.com/items?itemName=codezombiech.gitignore) | Great support for editing .gitignore files |
| [PHP Intellisense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client) | PHP code intelligence for Visual Studio Code |
| [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) | For linting and debugging Python code |
| [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin) | TSLint support for Visual Studio Code |
| [Wakatime](https://marketplace.visualstudio.com/items?itemName=WakaTime.vscode-wakatime) | To track the time I spend writing code in my editor |

That's all, just to name a few.

### Version Control Software

My preferred tool for that is Git which you can download [here](https://git-scm.com/downloads). The most complicated thing to do after installing Git is to configure an SSH key so that you can easily send your code to platforms like GitHub and GitLab. For that you can generate a key using the command `ssh-keygen` in Git Bash like this:

```
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

[Read here](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) for more information on how to learn more about that.

### Programming languages

The most important languages that I need for web development are Python, PHP and JavaScript.

#### Python

Getting Python installed on a Windows system is as simple as [downloading the installer](https://www.python.org/downloads/) and running it. Once you run the installer, just follow the instructions and, if you are asked to add Python to your system's `PATH` accept it. When done, you will be able to open your Windows terminal and execute `python`.

### PHP

Regarding PHP, I didn't want to use the stack provided by XAMPP or WAMPP... So I decided to install it separately from