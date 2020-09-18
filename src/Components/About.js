import React from "react";
export default function About() {
  return (
    <div>
      <section className="about">
        <h1 className="title">About</h1>
        <hr></hr>
        <h2>Welcome to Brewsy!</h2>
        <p>
          A day without coffee is like... Just kidding. We have no idea. At
          Brewsy we like big cups and we cannot lie.
        </p>
        <br></br>
        <p>
          Brewsy is where yelp meets untappd but for all things coffee. This
          site was made with both coffee lovers and shop owners in mind. Shop
          owners can register their shops and reward users for visiting their
          shops. While users can track their visits and receive rewards for
          every ten visits to their favorite spots.
        </p>
        <br></br>
        <p>
          To begin, users must follow the instruction on the sign up page and
          register. If you're a shop owner, follow the link at the bottom of the
          register page to sign up as an owner, and then email us at
          info@brewsy.com to get verified. Users: From login, you'll get
          redirected to "Search/Shops in my Area" where you can find a list of
          all the local coffee shops that are registered with Brewsy. To further
          narrow down your search, you can see all the coffee shops around you
          by searching by zip code. Once, you've found a coffee shop, click on
          the link to be directed to the shop's homepage.{" "}
        </p>
      </section>
      <div className="Form1">
        <h1 className="title">Developers:</h1>
        <hr></hr>
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">Carrie Grossman</p>
              <p className="subtitle">
                My Favorite Coffee Drink is... Caramel Macchiato
              </p>
              <div className="content">
                <figure className="image">
                  <img
                    src="https://avatars2.githubusercontent.com/u/66217922?s=400&u=4f29b2e3071b8a8351c1115142fdebb5a825c7c5&v=4"
                    alt="Carrie Grossman"
                  ></img>
                </figure>
                <p className="github">
                  <a href="https://github.com/carriegrossman">GitHub</a> |{" "}
                  <a href="https://www.linkedin.com/in/carriegrossman/">
                    LinkedIn
                  </a>
                </p>
              </div>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">Frida Garcia</p>
              <p className="subtitle">
                My Favorite Coffee Drink is... Pumpkin Cold Brew
              </p>
              <div className="content">
                <figure className="image">
                  <img
                    src="https://avatars3.githubusercontent.com/u/64746413?s=400&u=b2557388e88d2945ea789481757594174bc04f28&v=4https://avatars2.githubusercontent.com/u/66217922?s=400&u=4f29b2e3071b8a8351c1115142fdebb5a825c7c5&v=4"
                    alt="Frida Garcia"
                  ></img>
                </figure>
                <p className="github">
                  <a href="https://github.com/GarciaFrida">GitHub</a> |{" "}
                  <a href="www.linkedin.com/in/Fgarcia3">LinkedIn</a>
                </p>
              </div>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">Priyanka Farrell</p>
              <p className="subtitle">
                {" "}
                My Favorite Coffee Drink is... Spicy Tumeric Latte
              </p>
              <div className="content">
                <figure className="image">
                  <img
                    src="https://avatars0.githubusercontent.com/u/66265731?s=400&u=6ae329f19970376e5d0118177f884b232bfd215d&v=4"
                    alt="Priyanka Farrell"
                  ></img>
                </figure>
                <p className="github">
                  <a href="https://github.com/pfarrell18">GitHub</a> |{" "}
                  <a href="https://www.linkedin.com/in/priyanka-farrell-277273110/">
                    LinkedIn
                  </a>
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
