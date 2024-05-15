//public facing page 

const Public = () => {
  const content = (
    <main>
      <div className="content-container">
        <h1 className="main-title">WriteX</h1>
        <h2 className="subtext">Apply to college effortlessly with a streamlined, organized, and stress-free experience</h2>

      </div>

      <section className="add-colleges">
        <p>insert description</p>
      </section>
    </main>
  )

  return content
}

export default Public









// @import url('https://fonts.googleapis.com/css2?family=Calistoga&family=Passion+One:wght@400;700;900&display=swap');

// /* header styles */

// * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
// }

// body {
//     min-height: 100vh;
// }

// .header-container {
//     background-color: whitesmoke;
//     height: 60px;
//     width: 100%;
//     position: sticky;
//     display: inline-flex;
//     justify-content: space-between;
//     align-items: center;
// }

// #nav-bar-title {
//     font-family: "Calistoga", "Passion One";
//     color: #000;
//     padding-left: 20px;
// }

// .nav-buttons {
//     display: inline-flex;
//     gap: 15px;
//     padding-right: 20px;
// }

// ul {
//     list-style-type: none;
// }

// .nav-links {
//     text-decoration: none;
//     font-size: large;
// }

// a:link {
//     color: gray;
// }

// a:visited {
//     color: rgb(58, 58, 58);
// }

// a:hover {
//     text-decoration: underline;
// }

// /* main styles */

// .main-container {
//     background-image: url("../public/animated-purple-color-gradient-motion-background-free-video.jpg");
//     min-height: 95vh;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// }

// /* remove main, make it so that the image is part of a section,
// the image takes up the height of the section.  */

// main {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// }

// .content-container {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     width: 50%;
//     color: rgb(0, 0, 0);

// }

// .main-title {
//     font-family: "Calistoga", "Passion One";
//     font-size: 13em;
// }

// .subtext {
//     font-size: 2.2em;
//     justify-content: center;
//     text-align: center;
// }