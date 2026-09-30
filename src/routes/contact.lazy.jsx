import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import postContact from "../api/postContact";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function (formDataObj) {
      return postContact(
        formDataObj.name,
        formDataObj.email,
        formDataObj.message,
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutation.mutate({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    });
  };

  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <h3>Submitted!</h3>
      ) : (
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <textarea placeholder="Message" name="message" required></textarea>
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}
