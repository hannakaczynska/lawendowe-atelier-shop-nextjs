export default function GoogleMap({}) {
  return (
    <div className="rounded-md overflow-hidden h-[300px] w-[300px] md:h-[450px] md:w-[600px] mx-auto">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10117.886858389176!2d17.374406371371798!3d50.65550169994172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4711cdb7347ca88b%3A0x2a4c9335f67d3a0d!2sStary%20Grodk%C3%B3w!5e0!3m2!1spl!2spl!4v1786104769857!5m2!1spl!2spl"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
    ></iframe>
    </div>
  );
}
