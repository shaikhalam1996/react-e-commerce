import styled from "styled-components";

const Contact = () => {
  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;
 return (
    <Wrapper>
      <h2 className="common-heading">Contact</h2>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.508640497101!2d72.90662631421289!3d19.085329456640213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c62efb5dafab%3A0xd2529b8c4ccb4a6!2sINOX%20Neelyog%20Square%20Mall%2C%20Ghatkopar%20(E)!5e0!3m2!1sen!2sin!4v1664535975767!5m2!1sen!2sin" 
          width="100%" 
          height="400" 
          title="google"
          // style="border:0;" 
          style={{border:0}}
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
      </iframe>

      <div className="container">
        <div className="contact-form">
          <form action="https://formspree.io/f/xjvzrkvk" method="POST" className="contact-inputs">
            <input type="text" name="name" placeholder="Enter Your Name" />
            <input type="text" name="email" placeholder="Enter Your Email" />
            <textarea name="message" placeholder="Enter Your Message"></textarea>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </Wrapper>
  )
  // return <Wrapper></Wrapper>;
};

export default Contact;
