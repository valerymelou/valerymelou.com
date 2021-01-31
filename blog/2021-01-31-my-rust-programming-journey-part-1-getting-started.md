---
title: "My Rust Programming Journey: Part 1 - Getting started"
description: "A week ago I started learning the Rust Programming Language."
image: "/assets/images/posts/cuddlyferris-large-1.png"
date: 2021-01-31
topics: ["Rust"]
published: true
allowComments: true
---

# My Rust Programming Journey: Part 1 - Getting started

A week ago, I started learning the Rust Programming Language. I was just exploring to see what it’s like to write code in Rust and I ended up considering it for some of my future projects. It has some cool features that make me think of Python and some others that are totally out of this world! So I decided to write a series of posts to share my thoughts on the language.

In the first part of the series, I will just go through the installation of Rust and the creation of a new Rust project. No prior experience in programming is required to follow along.

<figure>
  <img src="/assets/images/posts/cuddlyferris-large-1.png" alt="Ferris">
  <figcaption>Meet <a href="https://rustacean.net/" target="_blank" rel="noopener nofollow">Ferris</a>, the unofficial mascot of Rust</figcaption>
</figure>

## Getting started with Rust

Let’s get started with the Rust Programming Language. We will install Rust and write a simple program that prints something in the console.
To install Rust on Windows, head over to <a href="https://www.rust-lang.org/learn/get-started" target="_blank" rel="noopener">https://www.rust-lang.org/learn/get-started</a> and click on the download rust-init.exe button corresponding to your operating system’s architecture (32-bit or 64-bit). Run the downloaded file when it completes and just follow the instructions.
If you are on a Unix-like system (Mac OS, Debian, Ubuntu…), run the following command in your terminal:

```console
$ curl https://sh.rustup.rs -sSf | sh
```

This command will download and run `rustup-init.sh` which in  turn will download and run the correct version of the rustup-init executable for your platform.

You should now have Rust installed on your computer. To check that, start a new terminal window and run the following command:

```console
$ cargo --version
```

If the installation was successful, you should see the version of Cargo in your terminal. Something like this: `cargo 1.49.0 (d00d64df9 2020-12-05)`.
Now, you might be asking yourself  what Cargo is. It is the Rust build tool that gets installed automatically when you install Rust. We will be using it to create new Rust projects, build them and even add external dependencies in them.

With Rust and Cargo installed, we can create our first Rust project. With your terminal, navigate to the folder where you want to create the project and run the command below:

```console
$ cargo new i-am-a-rustacean
```

This will generate a new folder called `i-am-a-rustacean` with the following files in it:

```console
i-am-a-rustacean
|- Cargo.toml
|- src
  |- main.rs
```

`Cargo.toml` is the manifest file for Rust. It’s where you keep metadata for your project, as well as dependencies.

`src/main.rs`  is the entry file of every Rust project. That’s where the code for our project will live. Open the file with your favorite editor. Its content should be similar to this:

```rust
fn main() {
    println!("Hello, world!");
}
```

What this code does is define a new function called `main` that will print `Hello, world!` in the console. The main function defined in the file `src/main.rs` of a rust project is the entry point of the program. Whenever the program will be run, that function will be called. Let’s try and run ours to see the output. From the root of the project (you should be in the folder where `Cargo.toml` is located) run the following command:

```console
$ cargo run
```

You should have an output similar to the one below:

```console
$ cargo run
   Compiling i-am-a-rustacean v0.1.0 (C:\Users\Projects\i-am-a-rustacean)
    Finished dev [unoptimized + debuginfo] target(s) in 1.54s
     Running `target\debug\i-am-a-rustacean.exe`
Hello, world!
```
You can see that Cargo built our project unoptimized for the dev target and ran the binary that was created (`target\debug\i-am-a-rustacean.exe` in my case since I ran the project on Windows).
Now let’s try and modify the code of the `main` function. Instead of printing `Hello, world!`, change it to print `I am a rustacean`. The code should now look like this:

```rust
fn main() {
    println!("I am a rustacean!");
}
```

When you run it, the output should be something like this:

```console
$ cargo run
   Compiling i-am-a-rustacean v0.1.0 (C:\Projects\i-am-a-rustacean)
    Finished dev [unoptimized + debuginfo] target(s) in 0.43s
     Running `target\debug\i-am-a-rustacean.exe`
I am a rustacean!
```

As you can see, Cargo rebuilt the project and ran it. It printed `I am a rustacean!` instead of `Hello, world!`.

## Conclusion
That was it. We officially created and executed our first program using the Rust Programming Language. It’s true it just prints a sentence in the console but it is possible to get from there to writing fairly complex programs with Rust very quickly. To get there, I will be going through the book which is the official documentation of the Rust Programming Language. I will also be sharing about my Rust journey here. If you don’t want to miss updates, follow me on my social accounts.
