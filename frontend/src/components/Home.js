import React from 'react'

export default function HomePage({}) {
    return (
        <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column text-center">
            <header class="masthead mb-auto">
                <div class="inner">
                    <h3 class="masthead-brand">Blah</h3>
                    <nav class="nav nav-masthead justify-content-center">
                        <a class="nav-link active" href="#">Home</a>
                        <a class="nav-link" href="#">Features</a>
                        <a class="nav-link" href="#">Contact</a>
                    </nav>
                </div>
            </header>

            <main role="main" class="inner cover">
                <h1 class="cover-heading">Cover your page.</h1>
                <p class="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
                <p class="lead">
                    <a href="#" class="btn btn-lg btn-secondary">Learn more</a>
                </p>
            </main>

            <footer class="mastfoot mt-auto">
                <div class="inner">
                    <p>&copy; Blah Soft 2020</p>
                </div>
            </footer>
        </div>



    )
}