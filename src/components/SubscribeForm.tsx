export const SubscribeForm = () => {
  return (
    <form className="max-w-md mx-auto">
      <div className="flex">
        <div className="relative w-full">
          <input
            type="text"
            className="subscribe__input subscribe__input:focus"
            placeholder="Type your email..."
            required
          />
          <button type="submit" className="home__subscribe-button">
            Subscribe
          </button>
        </div>
      </div>
    </form>
  );
};
