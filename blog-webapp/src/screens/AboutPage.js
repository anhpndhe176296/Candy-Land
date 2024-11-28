import React from "react";
import { Link } from "react-router-dom";
import facebookIcon from "../photos/facebook.png";
import instagramIcon from "../photos/instagram.png";
import logo from "../photos/logo.png";
import DefaultLayout from "../layouts/DefaultLayout";
import "../styles/about.css";
import { useEffect } from "react";
const AboutPage = () => {
  useEffect(() => {
    // Lắng nghe sự kiện khi nhấp vào các liên kết
    const links = document.querySelectorAll('a[href^="#"]');
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener("click", scrollOnClick);
    }

    // Hàm xử lý cuộn tự động
    function scrollOnClick(event) {
      event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
      const targetId = this.getAttribute("href"); // Lấy định danh của mục tiêu từ thuộc tính href
      const targetElement = document.querySelector(targetId); // Lấy phần tử mục tiêu dựa trên định danh
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" }); // Cuộn tự động đến phần tử mục tiêu
      }
    }
  }, []);

  return (
    <DefaultLayout>
      <div className="about-page">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "50px",
          }}
        >
          <Link to="/" className="logo-link">
            <img src="../../assets/images/lg.png" alt="logo" className="logo" />
          </Link>
        </div>
        <ul className="link-list">
          <a href="#intro">Giới thiệu</a>
          <a href="#story">Nguồn cảm hứng</a>
          <a href="#mission">Sứ mệnh - Tầm nhìn</a>
          <a href="#exp">Năng lực - Bằng cấp</a>
          <a href="#unique">Đặc điểm độc nhất</a>
          <a href="#overview">Tổng quan nội dung</a>
          <a href="#community">Cộng đồng</a>
        </ul>
        <section className="intro">
          <h2
            id="intro"
            style={{
              textAlign: "center",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            Giới thiệu
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "50%", textAlign: "justify" }}>
              <p>
                Chào mừng bạn đến với Candy Land - nơi chia sẻ niềm đam mê làm
                bánh và hương vị ngọt ngào đặc trưng. Chúng tôi là một blog ẩm
                thực đầy màu sắc, nơi bạn có thể khám phá các công thức làm bánh
                ngon lành, tìm hiểu về các loại bánh truyền thống và khám phá
                những ý tưởng sáng tạo để làm mới món tráng miệng hàng ngày.
              </p>
              <p>
                Tại Candy Land, chúng tôi tin rằng làm bánh không chỉ là cách
                thức đơn thuần để thỏa mãn nhu cầu dinh dưỡng. Nó còn là một
                nghệ thuật tinh tế, kết hợp giữa khéo léo trong việc chọn lựa
                nguyên liệu, kỹ năng chế biến và tình yêu đặt vào từng chiếc
                bánh. Chúng tôi muốn truyền cảm hứng và khơi dậy niềm đam mê làm
                bánh trong mỗi người, bởi mỗi chiếc bánh đều là một câu chuyện
                đậm chất gia đình, là cách tuyệt vời để chia sẻ niềm vui và kết
                nối với nhau.
              </p>

              <p>
                Hãy cùng nhau khám phá thế giới bánh ngọt đa dạng và thú vị tại
                Candy Land. Hãy cùng nhau tạo ra những món bánh ngon lành và
                chia sẻ niềm vui qua những hương vị ngọt ngào. Chúng tôi hy vọng
                rằng trang web của chúng tôi sẽ trở thành nguồn cảm hứng và
                nguồn kiến thức bổ ích cho bạn.
              </p>
              <p>
                Hãy cùng nhau trải nghiệm hương vị và nghệ thuật của làm bánh
                tại Candy Land!
              </p>
            </div>
          </div>
        </section>
        <section className="story">
          <h2
            id="story"
            style={{
              textAlign: "center",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            Nguồn cảm hứng
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "50%", textAlign: "justify" }}>
              <p>
                Khi còn nhỏ, tôi đã luôn thích ẩm thực và việc nấu nướng. Mỗi
                cuối tuần, tôi thường đứng bên bếp, hòa quyện trong mùi hương
                thơm của gia vị và những âm thanh vui tươi của nồi nấu. Từng món
                ăn đơn giản trở thành một sự thử thách và một cách để tôi kết
                nối với gia đình và bạn bè.
              </p>
              <p>
                Khi còn nhỏ, tôi đã luôn thích ẩm thực và việc nấu nướng. Mỗi
                cuối tuần, tôi thường đứng bên bếp, hòa quyện trong mùi hương
                thơm của gia vị và những âm thanh vui tươi của nồi nấu. Từng món
                ăn đơn giản trở thành một sự thử thách và một cách để tôi kết
                nối với gia đình và bạn bè.
              </p>
              <p>
                Khi lớn lên, tôi quyết định chia sẻ niềm đam mê của mình với mọi
                người thông qua việc tạo ra trang web Candy Land. Trang web này
                không chỉ là một nơi để chia sẻ công thức làm bánh, mà còn là
                một không gian để tôi thể hiện tình yêu và niềm đam mê với ẩm
                thực.
              </p>
              <p>
                Tôi muốn mọi người hiểu rõ rằng làm bánh không chỉ đơn thuần là
                việc nấu nướng và ăn uống. Nó là một nguồn cảm hứng vô tận, một
                cách để tạo ra những kỷ niệm đáng nhớ và tạo nên những liên kết
                mạnh mẽ trong gia đình và bạn bè.
              </p>
              <p>
                Qua trang web này, tôi hy vọng có thể truyền cảm hứng cho mọi
                người để thử những món bánh mới, khám phá những nguyên liệu độc
                đáo và chia sẻ niềm vui qua ẩm thực. Tôi muốn mọi người cảm thấy
                tự tin và thú vị khi đứng trước bếp, biết rằng mỗi chiếc bánh
                đều là một cách để thể hiện tình yêu và quan tâm đến nhau.
              </p>
              <p>
                Hãy cùng nhau tạo nên những món bánh ngon lành và tạo ra những
                kỷ niệm đáng nhớ. Hãy cùng nhau khám phá thế giới bánh ngọt đa
                dạng và truyền cảm hứng cho nhau tại Candy Land!
              </p>
            </div>
          </div>
        </section>
        <section className="mission">
          <h2
            id="mission"
            style={{
              textAlign: "center",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            Sứ mệnh{" "}
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "50%", textAlign: "justify" }}>
              <p>
                Sứ mệnh của chúng tôi là tạo ra một cộng đồng yêu thích làm
                bánh, nơi mọi người có thể khám phá, học hỏi và chia sẻ niềm đam
                mê về làm bánh. Chúng tôi mong muốn cung cấp cho mọi người những
                công thức đơn giản và ngon miệng, cung cấp kiến thức về nguyên
                liệu và kỹ năng làm bánh, và tạo ra một môi trường trực tuyến
                vui vẻ và tràn đầy cảm hứng.
              </p>
              <p>
                Tầm nhìn của chúng tôi là trở thành một nguồn tài nguyên hàng
                đầu về làm bánh trực tuyến, nơi mọi người có thể tìm kiếm và
                khám phá những công thức đa dạng, phong phú và phù hợp với mọi
                khẩu vị. Chúng tôi muốn trang web Candy Land trở thành một địa
                điểm trực tuyến đáng tin cậy, nơi mọi người có thể tìm thấy
                thông tin chính xác và hữu ích về làm bánh, từ nguyên liệu cho
                đến kỹ thuật làm bánh và xu hướng làm bánh mới nhất.
              </p>
              <p>
                Chúng tôi mong muốn lan tỏa niềm đam mê và yêu thích của mình
                đến mọi người, giúp mọi người tận hưởng hương vị của các món
                bánh ngon lành và tạo ra những kỷ niệm đáng nhớ qua làm bánh.
                Chúng tôi cam kết cung cấp nội dung chất lượng cao, dễ hiểu và
                thân thiện với người dùng, đồng thời xây dựng một cộng đồng sôi
                động và đáng tin cậy.
              </p>
              <p>
                Với sứ mệnh và tầm nhìn này, chúng tôi hy vọng có thể góp phần
                vào việc lan tỏa yêu thương và niềm vui thông qua làm bánh và
                tạo nên một cộng đồng yêu bánh ngọt đoàn kết và phát triển.
              </p>
              <p>
                Hãy cùng nhau trải nghiệm hương vị ngọt ngào và nghệ thuật làm
                bánh tại Candy Land. Chúng tôi rất mong chờ được chia sẻ những
                công thức đặc biệt, những bí quyết làm bánh hiệu quả và những
                câu chuyện ngọt ngào từ cộng đồng của chúng ta. Hãy cùng nhau
                biến mỗi chiếc bánh thành một tác phẩm nghệ thuật và mỗi lần làm
                bánh thành một kỷ niệm đáng nhớ.
              </p>
              <p>
                Hãy cùng nhau khám phá thế giới bánh ngọt đa dạng và thú vị tại
                Candy Land. Hãy cùng nhau tạo ra những món bánh ngon lành và
                chia sẻ niềm vui qua những hương vị ngọt ngào. Chúng tôi hy vọng
                rằng trang web của chúng tôi sẽ trở thành nguồn cảm hứng và
                nguồn kiến thức bổ ích cho bạn.
              </p>
              <p>
                Chúng tôi tin rằng với sự đam mê và tình yêu dành cho làm bánh,
                mỗi người đều có thể tạo ra những món bánh tuyệt vời và trải
                nghiệm niềm vui từ quá trình làm bánh. Hãy cùng nhau trải nghiệm
                và chia sẻ niềm đam mê này tại Candy Land!
              </p>
            </div>
          </div>
        </section>
        <section className="exp">
          <h2
            id="exp"
            style={{
              textAlign: "center",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            Năng lực
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "50%", textAlign: "justify" }}>
              <p>
                1. Chuyên gia làm bánh: Đội ngũ chúng tôi bao gồm những chuyên
                gia làm bánh có kinh nghiệm và kiến thức sâu sắc về làm bánh.
                Chúng tôi đã tham gia và thành công trong nhiều cuộc thi làm
                bánh quốc tế và có kiến thức vững chắc về các phương pháp làm
                bánh, kỹ thuật chế biến và cách phối hợp hương vị.
              </p>
              <p>
                2. Giáo dục và đào tạo: Chúng tôi có các bằng cấp và chứng chỉ
                liên quan đến làm bánh từ các trường đại học và các tổ chức uy
                tín. Chúng tôi đã hoàn thành các khóa học chuyên sâu về làm bánh
                và được đào tạo bởi các đầu bếp và chuyên gia làm bánh danh
                tiếng.
              </p>
              <p>
                3. Kinh nghiệm thực tế: Chúng tôi đã tích lũy nhiều năm kinh
                nghiệm trong lĩnh vực làm bánh. Chúng tôi đã làm việc trong các
                tiệm bánh danh tiếng, khám phá các nền văn hóa bánh ngọt khác
                nhau và nắm vững các nguyên liệu và kỹ thuật làm bánh.
              </p>
              <p>
                4. Nghiên cứu và sáng tạo: Chúng tôi luôn tiếp tục nghiên cứu và
                khám phá các xu hướng mới nhất trong lĩnh vực làm bánh. Chúng
                tôi không ngừng sáng tạo và phát triển các công thức mới, kết
                hợp các nguyên liệu độc đáo và tạo ra những trải nghiệm làm bánh
                độc đáo cho người dùng.
              </p>
              <p>
                5. Đánh giá và phản hồi từ cộng đồng: Chúng tôi đã nhận được
                nhiều đánh giá và phản hồi tích cực từ cộng đồng người dùng.
                Điều này là một minh chứng cho sự đáng tin cậy và chất lượng của
                nội dung và thông tin mà chúng tôi chia sẻ.
              </p>
              <p>
                Với sự kết hợp giữa kiến thức chuyên môn, kinh nghiệm thực tế và
                sự sáng tạo, chúng tôi tự tin rằng chúng tôi có khả năng cung
                cấp cho bạn những thông tin chính xác, các công thức ngon miệng
                và kiến thức bổ ích về làm bánh.
              </p>
              <p>
                Chúng tôi cam kết sẽ tiếp tục nâng cao chất lượng nội dung và
                dịch vụ, đảm bảo rằng mỗi công thức, mỗi bài viết đều mang lại
                giá trị và cảm hứng cho bạn. Chúng tôi rất mong nhận được sự ủng
                hộ và đóng góp ý kiến từ bạn để Candy Land ngày càng hoàn thiện
                và phát triển hơn.
              </p>
              <p>
                Hãy cùng nhau trải nghiệm và khám phá thế giới bánh ngọt tại
                Candy Land. Chúng tôi tin rằng với tình yêu và niềm đam mê làm
                bánh, mỗi người đều có thể tạo ra những món bánh tuyệt vời và
                trải nghiệm niềm vui từ quá trình làm bánh. Hãy cùng nhau biến
                mỗi chiếc bánh thành một tác phẩm nghệ thuật và mỗi lần làm bánh
                thành một kỷ niệm đáng nhớ.
              </p>
            </div>
          </div>
        </section>
        <section className="unique">
          <h2
            id="unique"
            style={{
              textAlign: "center",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            Điểm độc nhất{" "}
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "50%", textAlign: "justify" }}>
              <p>Chúng tôi đặc biệt với:</p>
              <p>
                1. Làm bánh gia đình: Chúng tôi tập trung vào việc chia sẻ các
                công thức và kinh nghiệm làm bánh phù hợp với gia đình. Chúng
                tôi hiểu rằng làm bánh không chỉ là việc chế biến thức ăn, mà
                còn là cách để tạo ra những kỷ niệm gia đình đáng nhớ. Chúng tôi
                cung cấp những công thức đơn giản, dễ làm và phù hợp với cuộc
                sống bận rộn của mọi gia đình.
              </p>
              <p>
                2. Món bánh đa dạng: Chúng tôi khám phá và chia sẻ những món
                bánh đa dạng từ nhiều nền văn hóa khác nhau. Từ bánh truyền
                thống đến bánh hiện đại, chúng tôi mang đến những công thức
                phong phú và đa dạng để người dùng có thể tìm thấy những món
                bánh phù hợp với khẩu vị và sở thích của họ.
              </p>
              <p>
                3. Tư vấn chuyên gia: Chúng tôi cung cấp những lời khuyên và tư
                vấn từ những chuyên gia làm bánh có kinh nghiệm. Người dùng có
                thể tìm thấy thông tin hữu ích về các nguyên liệu, kỹ thuật làm
                bánh, cách lựa chọn và bảo quản nguyên liệu, giúp họ trở thành
                thợ làm bánh tài ba trong gia đình.
              </p>
              <p>
                4. Cộng đồng sôi nổi: Chúng tôi xây dựng một cộng đồng năng động
                và sôi nổi xung quanh đam mê làm bánh. Người dùng có thể chia sẻ
                kinh nghiệm, gửi phản hồi và thảo luận với nhau về các công thức
                bánh, gợi ý mới và câu chuyện làm bánh của mình. Chúng tôi tạo
                ra một không gian tương tác và giao lưu, thúc đẩy sự chia sẻ và
                học hỏi từ nhau.
              </p>
              <p>
                5. Với những đặc điểm bán hàng độc nhất này, chúng tôi mang đến
                một trang web làm bánh độc đáo và hữu ích, giúp người dùng tận
                hưởng niềm đam mê làm bánh và xây dựng những món bánh đặc biệt
                cho gia đình.
              </p>
              <p>
                Hãy cùng nhau trải nghiệm niềm vui làm bánh tại Candy Land.
                Chúng tôi hy vọng rằng trang web của chúng tôi sẽ trở thành
                nguồn cảm hứng và nguồn kiến thức bổ ích cho bạn. Hãy cùng nhau
                tạo ra những món bánh ngon lành và chia sẻ niềm vui qua những
                hương vị ngọt ngào.
              </p>
              <p>
                Candy Land cam kết cung cấp nội dung chất lượng cao, dễ hiểu và
                thân thiện với người dùng. Chúng tôi sẽ tiếp tục nâng cao chất
                lượng nội dung và dịch vụ để mang lại những trải nghiệm tốt nhất
                cho bạn. Chúng tôi rất mong nhận được sự ủng hộ và đóng góp ý
                kiến từ bạn để Candy Land ngày càng hoàn thiện và phát triển
                hơn.
              </p>
              <p>
                Hãy cùng nhau biến mỗi chiếc bánh thành một tác phẩm nghệ thuật
                và mỗi lần làm bánh thành một kỷ niệm đáng nhớ. Hãy cùng nhau
                khám phá thế giới bánh ngọt đa dạng và thú vị tại Candy Land!
              </p>
            </div>
          </div>
        </section>
        <section className="overview">
          <h2
            id="overview"
            style={{
              textAlign: "center",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            Tổng quan
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "50%", textAlign: "justify" }}>
              <p>
                Trang web Candy Land sẽ mang đến cho bạn:
                <p>
                  1. Các công thức độc đáo: Từ món bánh truyền thống đến những
                  sáng tạo mới, chúng tôi chia sẻ những công thức độc đáo và hấp
                  dẫn. Bạn sẽ tìm thấy sự đa dạng trong các loại bánh và những
                  hướng dẫn chi tiết để bạn có thể thực hiện một cách dễ dàng.
                </p>
                <p>
                  2. Gợi ý sáng tạo: Chúng tôi cung cấp những ý tưởng sáng tạo
                  để làm mới bữa ăn hàng ngày của bạn. Bạn sẽ tìm thấy những
                  cách thức độc đáo để kết hợp các nguyên liệu và tạo ra những
                  món bánh độc đáo và hấp dẫn.
                </p>
                <p>
                  3. Chia sẻ kinh nghiệm: Chúng tôi không chỉ chia sẻ công thức
                  mà còn chia sẻ những kinh nghiệm, mẹo làm bánh và câu chuyện
                  thú vị xung quanh bánh ngọt. Bạn có thể khám phá thêm về các
                  phong cách nấu bánh khác nhau và học hỏi từ các chia sẻ của
                  cộng đồng.
                </p>
              </p>
            </div>
          </div>
        </section>
        <section className="community">
          <h2
            id="community"
            style={{
              textAlign: "center",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            Mạng xã hội{" "}
          </h2>

          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="social-icons"
          >
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={facebookIcon}
                alt="Facebook"
                style={{ width: "40px", height: "40px", marginRight: "8px" }}
              />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={instagramIcon}
                alt="Instagram"
                style={{ width: "40px", height: "40px" }}
              />
            </a>
          </div>
        </section>

        <section className="call-to-action">
          <h3
            style={{
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "20px",
            }}
          >
            Candy Land - Sweet
          </h3>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default AboutPage;
