import { FileUser, Github, Linkedin, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[radial-gradient(circle,rgba(161,240,149,1)_30%,rgba(237,223,223,1)_96%)] text-green-950 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-6">
        

        <div className="flex flex-row  justify-center items-center gap-4 text-xl">
          <a href="https://github.com/RabdeepKaur/previousyearquestions" className="hover:text-black"><Github /></a>
          <a href="https://www.linkedin.com/in/rabdeep-kaur-35a26925b" className="hover:text-black"><Linkedin /></a>
          <a href="https://x.com/Rabdeep790" className="hover:text-black"><Twitter /></a>
          <a href="https://drive.google.com/file/d/13ukFWvqedAB_Fuqw7u9SHLcL42qoQOFc/view" className="hover:text-black"><FileUser /></a>
        </div>
      </div>

     
    </footer>
  );
};

export default Footer;
