import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};
  const [image, setImage] = useState();
  const [product, setProduct] = useState();
  const roll = state.roll;
  const [data, setData] = useState({
    name: "",
    email: "",
    fatherName: "",
    address: "",
    mobile: "",
    branch: "",
    dob:"",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/data/${roll}`
        );

        setProduct(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [roll]);

  useEffect(() => {
    console.log("image Updated", image);
  }, [image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const updatedProduct = new FormData();
    updatedProduct.append("imageFile", image);
    updatedProduct.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
  
    axios
      .put(`http://localhost:8080/api/data/${roll}`, updatedProduct, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        navigate("/")
        if (response.status === 200) {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8QDQ0NDQ0ODQ4NEA0PDQ0QDQ8NDQ0NFREXGBYRFRYYHSghGholGxYVIjUiJSkrLi86FyE1OjMtNzAtLisBCgoKDQ0OFxAQGC8lHR4tLi0tKy0tMS4tNysrLy03LTcvNystLy0rKy03NzUtLS0tNysrLy8uKystKystLSstLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAADAAMBAQEAAAAAAAAAAAAAAQIDBgcIBQT/xABGEAABAwICBgYHBAcGBwAAAAABAAIDBBEFEgYHEyExURQiQWFxgSMyQlKCkaEVYnKSCCQzQ6KywURTY7GzwxYlVIOTwuH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQQCA//EACcRAQEAAgEEAAUFAQAAAAAAAAABAhEDEiExQRMyUWGRFCIjM0IE/9oADAMBAAIRAxEAPwDriEIVAhCEAhCEAhCaBJpgJgIJsiyuydkEWRlWSyLKDHlRZZLIsgx2SsslkrKiElZCRCCUJpIBCEIBCEIBCEIBCEIBCEIBCEIBCaYCBAKgFQCoBBICqydkwFArIsqsnZUTZFlVk7IIsiyuyVkEWRZXZKyCLKSFkslZQYyFJCykKSEGNJUQkqEhCEAhCEAhCEAhCEAmkqAQMBUAgBUAoABUAgBUAqEAqsmAnZQKyLKrIsgVkWVWQgmyLKkWQRZFlVkWQRZSQslkrIMZCkhZCFJCoxkKSFlIUEKDGkqISVCQhCAQhCAQhNAALIApAWQBAAKgEAKgEAAqAQAqAUAAnZCaBJoTQJCaECQmhAklSSBWSIVJIIISIVkKSEGMhSQshCkhUYyFBCykKCFBjQmUlQIQhAKgkqagpoVhIKgoGFYSCoIAKaidkbHSSyMijbvc97gxjR3k7gtd080viwqk2zmiWeUllLBe20eBvc7kxu657wO1ed8ZxquxSpaaiSWrle47GnY1zmNPuxRN4bu6/Mle3Hw3Pv6TbvuIa0cFhJb03bOHZBFLO3yeBl+q+RLrqwsHqwV8g5thhH80gWhYLqfxWcB0+woWnsleZJrfgZceRcFskWo5jRefFiD9ylbGP4nlenRwTzTu+9Brmwh3rNrIvxU7XfyOK+vQ6zMFmNm4hHGeU0ctOPzPaB9Vph1I07t0eLPJ7LwRPHyDgvn1uo2raCafEKaY9gkhkp7+YL1Ongvs7u1UNfBO3PTzxTs96KRkrfm0r9C801urXG6R+1jpXPLd4no52uePAAiT5BPDtY2N0D9jLO+Qt409fC57x4k5ZP4k/T7+XLZt6VQuWaP666SSzMQp5KN3bLHepg8SAM4+R8V0nDMTp6qITUs8VRGfbie17QeRtwPcV45YZY+Yr9SSaFwEkmhBKRVJFBBUlWVJQYypIVlSUGIhSrcpVCQhCBhW1QFkagsKgpCsIKCoKQqCg8+a6amSfHejMDnmGKmggjHtSSdfcOZL2jyC6LgeEUejtA2SRomrpxaSQW2kslrmNhPqxN/+7yQF8TSrCsummETvb6KrDHtJ4GeBjxbxFoj5rfavRtlTWuqqz0scbWR01P8Auw0C7nvHaS4ndwsBe/Z78mf7McZ9EaHNjeLYg4iATCO9slM10cbe50nb5nyUM0FxKTrPhY0niZJ2Od9CVsuO6bCix7D8KLY20lRAzaOtlMU0kj2xWtuAuwAj/Ev2Lel5XGzW/auRO1eV/uQHuEo/qEho9jNPvjZUsA7YakH6Ndf6Lr6FyORM0txalIbOXnkyppyL+dmuPzX0/wDjekqmbHFMOjlYeJyMqGX55H7x5ElfZ1qaV/ZmHGSNsb6md4ip45G52G2973N7QGg+Zav1SaJ4fWQRTiAQGaNkgfAdlYOaD6vqnj2hdasko0et1aYPiAL8IrDSS8dgSZo++8byHt8jYclomK6LYzgkpqWiWJrf7bSPc+Et/wASwuB3PFvFdJxbV5UxHaUkgqA3e1v7GdvhvsT33Hgvz4bplXUj9hVtdO1u50U4LJ2jucRf8wK9MefKdr3iafP0R10uGWLF4g9u4CsgZZwHOSLt8WflXXsLxOCqhbUUs0c8L/VkjcHNv2g8iOR3hcvxPQzB8ZDpcOeMOriC50OQNje7iS6Ibj+Jh7d9+C51JFi+j9YD16V7juc30lHWMHZyeO42cL9i9Ojj5Pl7X6D0+ktE0C1mU2I5KecNpK47hESdjOecTj2/cO/le11vhWfLG43VVKSopLkSVJVlSUGMqSrKgqiHLGVlcsbkEoQhBTVkasbVkCgsKgpCsKigqCkKgoNc04wd9RTw1FOzPWYbNHWUjb2MrmG74L/fbceNl9+iqmTRRTxHNHMxkkbuF2OFx/msoWCkphGXhm6N7nSBvuSON327iSXeJdz3XfbQ85a4ava49Wi+6EU8Dd/Y2Jrj/E9y7dq10k+0cLgne69RF6Cq57dgHX+Jpa74lw+oweTE6rSSsiJc+kfNUsaN+0Z0hwy+UTHEW7QF+7UxpJ0PE208jrU+I5YXXPVbUD9k7zJLfjHJbOTDfHqeY5ei00lqetDST7OwqeVjstRP+r02+xErwbv+Foc7yA7Vjxlt1HTiutrSPp+Kyhjr09FmpoOTnNPpZPNwt4Mau46tKra4Hhb+OWmjiPjF6M/yLz9pLos6hoMInkDhLXx1EsrTf0bQYzEy3YcjrntuTyC7HqJq9pgmz7aapqYvzWl/3Fr5pPhzXpI6Ivw4rhFPVMyVMLZB7JIs9h5tcN48l+5fipcWp5aiopYpmvnpNn0iIXzRZ23bfxHJY1c30h0Fnpjt6Nz542HNYbqmK3aLet4jf3dqMM0siqITQY1E2qppLN2zm5nN5F4G+495u8fVdVWoaX6Fx1IdPTBsVTvJHqxzn73J33vnzAci0+1cSULTXUDzVYcbPEjTmlpRxBcR6zOTxw7eZ2TVnrTN46DF5b3synr3nt4Bk5+gf8+azaNaRzYfK6mqGOdT5i2encOtEe0tB+o4H6r4Gs3QGOFn2thQEmHyjPNEzeKbN7bB/dE8R7J7vV1YZzknTn+Ud+SK4zqe1gkGPCa+S4NmUFQ87weyneT/AAn4eS7MV4Z4XC6qkVJVKSuBJUFWVBQQVjcspWNyCEIQqKasgWNqyNUFhWFAVBUWFQUhUFAwvz4lVCGnnnPCGKWU+DGF39F+gLV9aFZscCxN/vwbAeMzmx/+66xm7INK/R2pf1fEp3C5kkp4STvvkjc4/wCqudaw9Hjh2Kz07LsicRUUhG4theSWgcsrg5vwhdg1E0mTBdp/1FVUSflyxf7aNdmjXS8O6ZE28+H5pLAb30pttW+Vg/4DzWmcmua/dPTYdXukYxHDKepJG2aNjVNHs1DAMxt2Aizh3OC59j3/AD3SiKgHXoMKzGo7WPLXDaj4n5I/BritG0E01lwtte1gLhVQOEI4tjrBujlI5WLr87NXXdSujhpMN6VKD0jES2dxdveIP3QJ7wS/41MsPh25fgfN/SDpL4fRTAfsqrJfk18L/wCrGr8X6O9XePE6f3X00wH42uaf9MfNbRrpptpgFWbXML6WUd1p2An5OK5zqCq8mLVEN909I825vjkYR9HOTHvw37Ht3PGMRjpaWoq5jaOniklfzIa29h3nh5rzrq60qkhx9lXUP3YjLJFVnflvO+7T3BsmTwF10LXxjDhS0uFQdeavlY5zBxdGx4yN+KUst+ArmWsfRP7Lq4YGlzo5qaGRshPGYNyy2P4xm7s4V4MZ06v+ivUKRWvavse+0MKpKpxvLk2VR3VEfVefO2bwcFsKy2auqrUtO9GBVRGogb+tRN4D9/GPYP3h2fLw1PQLHhFL0Kos6lqiWZXi7I5Hbt4Psu4Ed4PNdZXHtYOFCnr3OYLR1I2zQNwa8kh4Hnv+JQaJrM0SOF1+SLN0SozS0jrm7AD1or82Eix5Fvbddl1V6WHEsPAmderpC2Kp4XkFupN8QBv3tcvlaZUv2pov0hwzVFIzpAd7W0gu2X8zA/5hc61M4s6nxqCK/o61klPIL7s2UvY7xzNt8ZWv+zi3fMTw9GqSqKkrIqSoKsqCgkrG5WVjcglCEKigrasYVtQZArCgKggsKgpCoKClynXnpLTdAGHxVEUlRLUR7aJkrXOhjiu45wPVOYMFjY8eS6qp2Tb3ytueJyi5XeGUxstGj6nMWpH4PR0kNRC6oiZM6anEjdswmZxc4s426w38N4W+OaCCCAQQQQRcEcipaxo3hrQeYACtTK7to89y6uHDSRuGBjuhPJqw/fYYeDcsvzzei57wV6Ea0AAAAAAAACwA5BCa6z5Lnrfoa9rEaw4JiokcGt6JUbybDOGHL/FZeddX2Px0OLUdXK/LC1z2Tkb7RSMLSbDeQCWu3e6vVRF9x3jktR1o4y2hwipkYGtmnApqfcARJJcFw72tzu+Fd8Wep0a8pWh6NyfbWls1d69JhwzQni0sjJZDb8Ty+UeC2TXpgm3wttW1t5MPkDyQLno77NkHhfI74FrmrLQTEehR1kGLPw2KsAkMEVM2SR8bS4RuL3HdcG43e0ujUmijgyRlXidfXxyxyRSQzOgEDmPYWnqsjB4E9q6zymOcsvgcw1BY9s6qpw17rNqm7eAE/v4xZ7R3llj/ANtdzXkyN0+FYoDvM+G1JB9nahjrHyez6OXqyhq2TwxVETs0U8bJY3e8xzQQfkVP+jHv1T2RnXOdbThmoR7QFQTzykx2/wAit7xPEYaaJ01RII2N7TxcfdaOJPcFzlmHVOM1pqnsdBRizWvO47FpNms95xuSTwF+4BZ1fX0eAi0cqZJtzDBXyG/93lcPrb6rimrCmdJjeFtaN7ZhI7ubHG5zj8gt/wBbGmERhbgGF+mc4siqNgDIGsYRalZl3ucSBe19wI4k2+5qk0Dfh7H1tY0CsnZkZFcHo0BIJaSPbcQL8rAc1qw/j47b7R0YqSmVJWVUlQVRUlUS5Y3K3LGUCQhCBqmqFQQZQqCxgqwoMgVBYwrCCwmpCaCkJJoGmpTQNcP1tVbsSxyhwSB3VicyOQjflnlsXu+CIA+bguwYxS1MseSlq20bjmDpejNqJOG7JmcGgjfxDloeE6pujVseIR4rO+pjlfMXyU8cgke++cu33Nw5199969uK443qt7+kro9LTsijjijaGxxMZHG0cGsaLADyCypIXirg2vrA9lXwV7G2ZWx7OUgf2iIWufFhb/4ytk1JY26poJMOdUOiloXEx5WsMjqV5uLF4I6rsw4bgWrcdOtFG4rSx0r5zTtZK2bO2Jsjy4NIAFzu9YrUcG1Quo6hlVSYzPDNHfK7osZBaeLXDNZzTyK09eOXH05XujdJ9G4y/a2jmmHqy1glrMvgzM1rfKy/LiWi89W3JWYrUiE2DqeiZHQxPHuk9eQt7s6+/RMlbG1s8rJpBfNIyIwNdv3dXM63zWdZ5bPCviaPaJ4fh4/UqSOF1rGWxkncORkdd1u69l9ooSKW2+QipKZUkqCSpKZUkoJcoTcVKoEIQgE0kIMgKsLECrBUGQFUCsYKoFUZAVQUApgqC01IKaBpqU0DQkhA0JIQNJCSBpIuldAFSSglIlAiVJKZKklUIlQ4pkqCVAikhCoEIQgEIQgaYKlNBkBVgrECqBUGQFUCsYKoFUZAU7qAU7qC7p3UXTugpCm6LoKQpui6CrpXSuldA7pEpXSJQBKRKRKRKoCVJKCVBKgCVKElQIQhAIQhAIQhAIQhA0wVKaDICqBWIFUCoMl07qAU7oLundRdF1Rkui6i6LqC7ououi6CrpXU3RdUO6V0rpEqBkqSUiVJKBkqUJKgQhCAQhCAQhCAQhCAQhCAQhCATSQgoFUCsaaDJdO6xXTugyXTusV07qDJdK6i6V0GS6V1F0rqi7qSUkkDukhCAQhCAQhCAQhCAQhCAQhCAQhCAQhCAQhCAQhCAQhCAQhCAQhCAQhCAQhCAQhCAQhCAQhCAQhCAQhCD//Z"
                      alt=""
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Form Updated Successfully
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ));
          navigate("/");

        navigate("/");
      } else {
        toast.error("Failed to submit form. Please try again.");
        setData({
          name: "",
          email: "",
          fatherName: "",
          address: "",
          mobile: "",
          branch: "",
          roll: "",
          dob: "",
        });
        
        setImage(null);
      }
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        console.log("product unsuccessfull update",data)
        toast.error("Failed to update product. Please try again.");
      });
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <div className="mb-4">
          <p
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </p>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Father Name
          </label>
          <input
            type="text"
            id="fatherName"
            name="fatherName"
            value={data.fatherName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Email"
          />
        </div>
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={data.dob}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Mobile No.
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={data.mobile}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Email"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Email"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Branch
          </label>
          <input
            type="text"
            id="branch"
            name="branch"
            value={data.branch}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Email"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            address
          </label>
          <textarea
            id="address"
            name="address"
            value={data.address}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Message"
          ></textarea>
        </div>
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image
            </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>


        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
