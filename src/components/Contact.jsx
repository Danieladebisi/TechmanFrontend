import { GrLocation, GrPhone, GrMail } from "react-icons/gr";
// import Button from 'react-bootstrap/Button';
import NavbarMenu from "./NavbarMenu";

const Contact = () => {
  return (
    <>
      <NavbarMenu />
      <div className="container mx-auto mt-24 p-5 font-mulish text-center">
        <h1 className="text-4xl font-bold text-darkblue">CONTACT</h1>
        <p className="mt-2 text-lg text-gray-600">
          Worldwide multimodal logistics and warehousing services for all types
          of vehicles.
        </p>

      <div className="font-inter border border-gray-300 rounded-lg shadow-lg mt-10 p-8 flex flex-col md:flex-row-reverse justify-center items-center">
          {/* Form Section */}
          <div className="md:w-3/5 bg-white p-8 mt-5 rounded-lg flex justify-center items-center">
            <h2 className="text-xl font-semibold text-center text-darkblue mb-6">
              ONLINE INQUIRY
            </h2>
            <form className="space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="my-2">
                  <label className="block m-4 text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    className="w-full px-4 py-3 border rounded-lg text-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:outline-blue-500"
                  />
                </div>
                <div className="my-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1 m-4">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    className="w-full mb-4 px-4 py-3 border rounded-lg text-gray-500 outline-none focus:ring-2 focus:ring-red-500 focus:outline-blue-500"
                  />
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="my-2">
                  <label className="block m-2 text-sm font-medium text-gray-700 mt-3 m-2">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Phone Number"
                    className="w-full mb-4 px-4 py-3 border rounded-lg text-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:outline-blue-500"
                  />
                </div>
                <div className="my-2">
                  <label className="block m-2 text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full mb-4 px-4 py-3 border rounded-lg text-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:outline-blue-500"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="my-2">
                <label className="block m-4 text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  placeholder="Write your message..."
                  rows="4"
                  className="w-full px-4 py-3 border rounded-lg resize-none text-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:outline-blue-500"
                ></textarea>
              </div>

              {/* Submit Button */}
              {/* <Button variant="primary" type="submit" className="mb-5">
                  Login
                </Button> */}
            </form>
          </div>

          {/* Contact Info Section */}
          {/* <div className="w-full bg-blue-950 text-white p-8 rounded-lg md:rounded-r-lg flex flex-col gap-6"> */}
          {/* <h3 className=" text-lg font-semibold">CONTACT INFORMATION</h3>
            <p>We Ship FCL/LCL from the USA to around the world.</p>
            <div className="flex items-center gap-3">
              <GrLocation className="w-6 h-6" />
              <p>3456 Crestwood Parkway, Suite 400, Duluth GA, New York, USA</p>
            </div>
            <div className="flex items-center gap-3">
              <GrPhone className="w-6 h-6" />
              <p>(+1) 912 000 4300</p>
            </div>
            <div className="flex items-center gap-3">
              <GrMail className="w-6 h-6" />
              <p>Techmansioninfo@gmail.com</p>
            </div>
          </div>*/}
        </div> 
      </div> 
    </>
  );
};
export default Contact;
