const ServiceCard = ({ title, description, tag }) => {
  return (
    <div className="bg-beige rounded-lg shadow-md p-6 w-full flex flex-col gap-2">
      <p className="text-xl font-semibold">{title}</p>
      <p className="text-[16px]">{description}</p>
      <p className="text-[14px] bg-gray-200 p-2 rounded-2xl w-max">{tag}</p>
      <a className="underline text-secondary cursor-pointer">Book a session →</a>
    </div>
  );
};

export default ServiceCard;