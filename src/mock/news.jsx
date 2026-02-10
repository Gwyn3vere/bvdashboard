import {
  LuBook,
  LuBookCheck,
  LuEye,
  LuBookKey,
  LuBookText,
} from "react-icons/lu";

export const NEWS_TOTAL_STATUS = [
  {
    icon: <LuBook />,
    title: "Tổng bài đăng",
    desc: "+15 bài đăng trong tháng này",
    total: 132,
  },
  {
    icon: <LuBookCheck />,
    title: "Đã xuất bản",
    desc: "70% tổng số bài viết",
    total: 89,
  },
  {
    icon: <LuBookKey />,
    title: "Bản phê duyệt",
    desc: "Cần chờ phê duyệt",
    total: 28,
  },
  { icon: <LuBookText />, title: "Bản nháp", desc: "Cần hoàn thiện", total: 5 },
  {
    icon: <LuEye />,
    title: "Tổng lượt xem",
    desc: "+3.2k so với tháng trước",
    total: 15800,
  },
];

export const MOCK_NEWS_LIST = [
  {
    id: "news-001",
    authorId: "3",
    title: "7 thói quen vàng giúp phòng ngừa bệnh tim mạch hiệu quả",
    shortDesc:
      "Bệnh tim mạch đang là nguyên nhân gây tử vong hàng đầu. Tìm hiểu 7 thói quen đơn giản giúp bạn bảo vệ trái tim khỏe mạnh mỗi ngày.",
    content: `
      <h2>Tại sao cần chăm sóc sức khỏe tim mạch?</h2>
      <p>Theo Tổ chức Y tế Thế giới (WHO), bệnh tim mạch là nguyên nhân gây tử vong hàng đầu trên toàn cầu với hơn 17.9 triệu ca tử vong mỗi năm. Tuy nhiên, phần lớn các bệnh tim mạch có thể phòng ngừa được thông qua lối sống lành mạnh.</p>
      
      <h2>1. Tập thể dục đều đặn ít nhất 30 phút mỗi ngày</h2>
      <p>Vận động thể chất là một trong những cách hiệu quả nhất để duy trì sức khỏe tim mạch. Các nghiên cứu cho thấy chỉ cần 30 phút tập luyện vừa phải mỗi ngày có thể giảm nguy cơ mắc bệnh tim lên đến 35%.</p>
      <p><strong>Các bài tập được khuyến nghị:</strong></p>
      <ul>
        <li>Đi bộ nhanh hoặc chạy bộ nhẹ</li>
        <li>Bơi lội</li>
        <li>Đạp xe</li>
        <li>Yoga và thiền định</li>
      </ul>
      
      <h2>2. Chế độ ăn uống lành mạnh, giảm muối và chất béo</h2>
      <p>Chế độ dinh dưỡng đóng vai trò quan trọng trong việc bảo vệ tim mạch. Một chế độ ăn giàu rau xanh, trái cây, ngũ cốc nguyên hạt và protein nạc sẽ giúp giảm cholesterol xấu.</p>
      
      <h3>Thực phẩm tốt cho tim:</h3>
      <ul>
        <li>Cá hồi, cá thu giàu omega-3</li>
        <li>Yến mạch và ngũ cốc nguyên hạt</li>
        <li>Quả óc chó, hạnh nhân</li>
        <li>Rau xanh đậm như cải bó xôi</li>
      </ul>
      
      <h2>3. Kiểm soát cân nặng và huyết áp thường xuyên</h2>
      <p>Duy trì cân nặng ở mức lý tưởng và theo dõi huyết áp là những yếu tố quan trọng. Thừa cân làm tăng gánh nặng cho tim, trong khi huyết áp cao có thể gây tổn thương mạch máu.</p>
      
      <h2>4. Giảm stress và ngủ đủ giấc 7-8 tiếng mỗi đêm</h2>
      <p>Stress kéo dài và thiếu ngủ có thể gây tổn hại nghiêm trọng đến tim mạch. Học cách quản lý căng thẳng thông qua thiền định, yoga sẽ giúp bảo vệ trái tim của bạn.</p>
      
      <h2>5. Không hút thuốc và hạn chế rượu bia</h2>
      <p>Hút thuốc lá là một trong những yếu tố nguy cơ lớn nhất gây bệnh tim mạch. Bỏ thuốc lá có thể giảm nguy cơ bệnh tim xuống 50% chỉ sau 1 năm.</p>
      
      <h2>Kết luận</h2>
      <p>Chăm sóc sức khỏe tim mạch là hành trình dài hạn đòi hỏi sự kiên trì. Bằng cách áp dụng những thói quen lành mạnh vào cuộc sống hàng ngày, bạn không chỉ bảo vệ được sức khỏe tim mạch mà còn nâng cao chất lượng cuộc sống.</p>
    `,
    category: "Tin tức sức khỏe",
    tags: ["tim mạch", "sức khỏe", "phòng ngừa bệnh", "lối sống lành mạnh"],
    metaTitle:
      "7 Thói Quen Vàng Phòng Ngừa Bệnh Tim Mạch | Trung Tâm Y Tế Liên Chiểu",
    metaDesc:
      "Khám phá 7 thói quen đơn giản nhưng hiệu quả giúp bạn phòng ngừa bệnh tim mạch, bảo vệ sức khỏe tim mạch toàn diện.",
    status: "PUBLISH",
    thumbnail: "https://picsum.photos/seed/news001/800/450",
    view: 1247,
  },

  {
    id: "news-002",
    authorId: "7",
    title: "Phòng chống COVID-19: Hướng dẫn tiêm vaccine mũi nhắc lại 2026",
    shortDesc:
      "Cập nhật mới nhất về chương trình tiêm vaccine COVID-19 mũi nhắc lại năm 2026, đối tượng ưu tiên và lịch tiêm tại Trung tâm Y tế Liên Chiểu.",
    content: `
      <h2>Tại sao cần tiêm mũi nhắc lại?</h2>
      <p>Virus SARS-CoV-2 liên tục biến đổi với các biến chủng mới xuất hiện. Tiêm mũi nhắc lại giúp tăng cường khả năng miễn dịch, bảo vệ cơ thể khỏi các biến chủng mới và giảm nguy cơ mắc bệnh nặng.</p>
      
      <h2>Đối tượng ưu tiên tiêm mũi nhắc lại</h2>
      <ul>
        <li>Người từ 60 tuổi trở lên</li>
        <li>Người có bệnh nền: tim mạch, đái tháo đường, bệnh phổi mạn tính</li>
        <li>Phụ nữ mang thai</li>
        <li>Nhân viên y tế</li>
        <li>Người có suy giảm miễn dịch</li>
      </ul>
      
      <h2>Các loại vaccine được sử dụng</h2>
      <p>Hiện nay, Bộ Y tế đang sử dụng các loại vaccine sau cho mũi nhắc lại:</p>
      <ul>
        <li>Pfizer-BioNTech (Comirnaty) - cập nhật biến chủng 2026</li>
        <li>Moderna (Spikevax) - công thức mới</li>
        <li>AstraZeneca - dành cho đối tượng đặc biệt</li>
      </ul>
      
      <h2>Lịch tiêm tại Trung tâm Y tế Liên Chiểu</h2>
      <p><strong>Thời gian:</strong> Thứ 2 - Thứ 6: 7h00 - 11h00 và 13h30 - 16h30</p>
      <p><strong>Địa điểm:</strong> Phòng tiêm chủng, Tầng 2, Trung tâm Y tế Liên Chiểu</p>
      <p><strong>Đăng ký:</strong> Gọi hotline 0236.123.4567 hoặc đăng ký trực tuyến</p>
      
      <h2>Lưu ý quan trọng</h2>
      <p>Sau khi tiêm, bạn nên:</p>
      <ul>
        <li>Nghỉ ngơi tại chỗ 15-30 phút để theo dõi</li>
        <li>Uống nhiều nước</li>
        <li>Tránh vận động mạnh trong 24h đầu</li>
        <li>Liên hệ y tế nếu có triệu chứng bất thường</li>
      </ul>
    `,
    category: "Phòng chống dịch",
    tags: ["covid-19", "vaccine", "tiêm chủng", "phòng dịch"],
    metaTitle: "Hướng Dẫn Tiêm Vaccine COVID-19 Mũi Nhắc Lại 2026",
    metaDesc:
      "Thông tin chi tiết về chương trình tiêm vaccine COVID-19 mũi nhắc lại, đối tượng ưu tiên và lịch tiêm tại Liên Chiểu.",
    status: "PUBLISH",
    thumbnail: "https://picsum.photos/seed/news002/800/450",
    view: 892,
  },

  {
    id: "news-003",
    authorId: "12",
    title: "Dinh dưỡng cho trẻ em: Thực đơn cân bằng theo từng độ tuổi",
    shortDesc:
      "Bí quyết xây dựng thực đơn dinh dưỡng cân bằng cho trẻ từ 0-12 tuổi, đảm bảo sự phát triển toàn diện về thể chất và trí tuệ.",
    content: `
      <h2>Tầm quan trọng của dinh dưỡng với trẻ em</h2>
      <p>Dinh dưỡng trong giai đoạn từ 0-12 tuổi ảnh hưởng trực tiếp đến sự phát triển thể chất, trí tuệ và hệ miễn dịch của trẻ. Một chế độ dinh dưỡng cân bằng sẽ giúp trẻ phát triển khỏe mạnh, tăng khả năng học tập và phòng chống bệnh tật.</p>
      
      <h2>Dinh dưỡng cho trẻ 0-6 tháng tuổi</h2>
      <p>Giai đoạn này, sữa mẹ là nguồn dinh dưỡng tốt nhất và duy nhất cho trẻ.</p>
      <ul>
        <li>Cho con bú hoàn toàn bằng sữa mẹ</li>
        <li>Bú theo nhu cầu, không giới hạn thời gian</li>
        <li>Không cần cho trẻ uống nước, trừ khi có chỉ định của bác sĩ</li>
      </ul>
      
      <h2>Dinh dưỡng cho trẻ 6-12 tháng tuổi</h2>
      <p>Đây là giai đoạn bắt đầu ăn dặm, bổ sung thêm các nhóm thực phẩm:</p>
      <h3>Thực đơn mẫu:</h3>
      <ul>
        <li><strong>6-7 tháng:</strong> Bột, cháo loãng, rau củ nghiền</li>
        <li><strong>8-9 tháng:</strong> Cháo đặc hơn, thịt, cá nghiền</li>
        <li><strong>10-12 tháng:</strong> Cơm nát, thức ăn cắt nhỏ</li>
      </ul>
      
      <h2>Dinh dưỡng cho trẻ 1-3 tuổi</h2>
      <p>Trẻ bắt đầu ăn như người lớn nhưng cần chú ý:</p>
      <ul>
        <li>3 bữa chính + 2 bữa phụ mỗi ngày</li>
        <li>Đảm bảo đủ 4 nhóm: bột đường, đạm, béo, vitamin</li>
        <li>Khuyến khích trẻ ăn rau xanh, trái cây</li>
        <li>Hạn chế đồ ngọt, đồ chiên rán</li>
      </ul>
      
      <h2>Dinh dưỡng cho trẻ 4-6 tuổi</h2>
      <p>Giai đoạn trẻ bắt đầu đi học, cần năng lượng cao:</p>
      <h3>Thực đơn mẫu 1 ngày:</h3>
      <ul>
        <li><strong>Sáng:</strong> Cháo trứng/phở + sữa</li>
        <li><strong>Trưa:</strong> Cơm + thịt/cá + rau + canh</li>
        <li><strong>Chiều:</strong> Hoa quả, sữa chua</li>
        <li><strong>Tối:</strong> Cơm + món mặn + rau</li>
      </ul>
      
      <h2>Dinh dưỡng cho trẻ 7-12 tuổi</h2>
      <p>Trẻ đang trong giai đoạn tăng trưởng nhanh:</p>
      <ul>
        <li>Tăng lượng protein từ thịt, cá, trứng, đậu</li>
        <li>Bổ sung canxi từ sữa, sữa chua, phô mai</li>
        <li>Ăn nhiều rau xanh, trái cây</li>
        <li>Uống đủ nước (1.5-2 lít/ngày)</li>
        <li>Hạn chế đồ ăn nhanh, nước ngọt</li>
      </ul>
      
      <h2>Lời khuyên từ chuyên gia dinh dưỡng</h2>
      <p>Bác sĩ Nguyễn Thị Lan, chuyên gia dinh dưỡng tại Trung tâm Y tế Liên Chiểu khuyên: "Cha mẹ nên tạo thói quen ăn uống lành mạnh từ sớm, làm gương cho con và tạo bầu không khí vui vẻ trong bữa ăn."</p>
    `,
    category: "Dinh dưỡng",
    tags: ["dinh dưỡng", "trẻ em", "thực đơn", "phát triển"],
    metaTitle: "Thực Đơn Dinh Dưỡng Cân Bằng Cho Trẻ Em 0-12 Tuổi",
    metaDesc:
      "Hướng dẫn chi tiết xây dựng thực đơn dinh dưỡng khoa học cho trẻ từ 0-12 tuổi, giúp bé phát triển toàn diện.",
    status: "PUBLISH",
    thumbnail: "https://picsum.photos/seed/news003/800/450",
    view: 2156,
  },

  {
    id: "news-004",
    authorId: "5",
    title: "Chăm sóc sức khỏe răng miệng: Phòng ngừa sâu răng hiệu quả",
    shortDesc:
      "Hướng dẫn chi tiết cách chăm sóc răng miệng đúng cách, phòng ngừa sâu răng và các bệnh lý răng miệng thường gặp.",
    content: `
      <h2>Tại sao cần chăm sóc răng miệng?</h2>
      <p>Răng miệng khỏe mạnh không chỉ giúp bạn ăn uống ngon miệng mà còn ảnh hưởng đến sức khỏe tổng thể. Nhiều bệnh lý toàn thân như tim mạch, đái tháo đường có liên quan đến bệnh răng miệng.</p>
      
      <h2>Nguyên nhân gây sâu răng</h2>
      <ul>
        <li>Vi khuẩn trong miệng tạo acid phá hủy men răng</li>
        <li>Ăn nhiều đồ ngọt, tinh bột</li>
        <li>Vệ sinh răng miệng không đúng cách</li>
        <li>Thiếu fluoride</li>
        <li>Khô miệng do giảm tiết nước bọt</li>
      </ul>
      
      <h2>Cách đánh răng đúng cách</h2>
      <p><strong>Tần suất:</strong> Đánh răng 2 lần/ngày, mỗi lần 2-3 phút</p>
      <h3>Các bước đánh răng:</h3>
      <ol>
        <li>Đặt bàn chải nghiêng 45 độ so với nướu</li>
        <li>Chuyển động nhẹ nhàng theo chiều từ nướu xuống răng</li>
        <li>Đánh cả 3 mặt của răng: ngoài, trong, mặt nhai</li>
        <li>Đánh lưỡi để loại bỏ vi khuẩn</li>
        <li>Súc miệng sạch</li>
      </ol>
      
      <h2>Sử dụng chỉ nha khoa</h2>
      <p>Chỉ nha khoa giúp làm sạch kẽ răng - nơi bàn chải không thể làm sạch được:</p>
      <ul>
        <li>Dùng chỉ nha khoa 1 lần/ngày, tốt nhất là trước khi đi ngủ</li>
        <li>Luồn chỉ nhẹ nhàng vào kẽ răng, tránh làm tổn thương nướu</li>
        <li>Cọ sạch cả 2 bên thành răng</li>
      </ul>
      
      <h2>Chế độ ăn uống tốt cho răng</h2>
      <h3>Nên ăn:</h3>
      <ul>
        <li>Sữa, phô mai, sữa chua (giàu canxi)</li>
        <li>Rau xanh đậm màu</li>
        <li>Táo, cà rốt (giúp làm sạch răng tự nhiên)</li>
        <li>Nước lọc (rửa trôi acid và vi khuẩn)</li>
      </ul>
      
      <h3>Nên hạn chế:</h3>
      <ul>
        <li>Kẹo, bánh ngọt</li>
        <li>Nước ngọt có ga</li>
        <li>Đồ ăn dính răng như kẹo dẻo</li>
        <li>Thức ăn quá cứng</li>
      </ul>
      
      <h2>Khám răng định kỳ</h2>
      <p>Bạn nên khám răng định kỳ 6 tháng/lần để:</p>
      <ul>
        <li>Phát hiện sớm các vấn đề răng miệng</li>
        <li>Lấy cao răng định kỳ</li>
        <li>Nhận tư vấn chăm sóc răng miệng phù hợp</li>
      </ul>
      
      <h2>Dịch vụ tại Trung tâm Y tế Liên Chiểu</h2>
      <p>Chúng tôi cung cấp đầy đủ các dịch vụ răng hàm mặt:</p>
      <ul>
        <li>Khám và tư vấn miễn phí</li>
        <li>Lấy cao răng, trám răng</li>
        <li>Nhổ răng, tiểu phẫu</li>
        <li>Bọc răng sứ, cấy ghép implant</li>
        <li>Chỉnh nha niềng răng</li>
      </ul>
    `,
    category: "Chăm sóc sức khỏe",
    tags: ["răng miệng", "sức khỏe", "phòng ngừa", "nha khoa"],
    metaTitle: "Hướng Dẫn Chăm Sóc Răng Miệng Và Phòng Ngừa Sâu Răng",
    metaDesc:
      "Cách đánh răng đúng, sử dụng chỉ nha khoa và chế độ ăn uống để có hàm răng khỏe mạnh, phòng ngừa sâu răng hiệu quả.",
    status: "WAITING",
    thumbnail: "https://picsum.photos/seed/news004/800/450",
    view: 567,
  },

  {
    id: "news-005",
    authorId: "9",
    title: "Y tế cộng đồng: Chương trình khám sức khỏe miễn phí tháng 3",
    shortDesc:
      "Thông báo chương trình khám sức khỏe tổng quát miễn phí dành cho người cao tuổi và hộ nghèo tại Liên Chiểu trong tháng 3/2026.",
    content: `
      <h2>Giới thiệu chương trình</h2>
      <p>Nhằm chăm sóc sức khỏe cộng đồng, Trung tâm Y tế Liên Chiểu phối hợp cùng UBND quận tổ chức chương trình khám sức khỏe miễn phí cho người cao tuổi và hộ nghèo trong tháng 3/2026.</p>
      
      <h2>Đối tượng được khám</h2>
      <ul>
        <li>Người cao tuổi từ 60 tuổi trở lên đang sinh sống tại quận Liên Chiểu</li>
        <li>Hộ nghèo, cận nghèo có xác nhận của UBND phường</li>
        <li>Người khuyết tật</li>
        <li>Gia đình chính sách, có công với cách mạng</li>
      </ul>
      
      <h2>Nội dung khám</h2>
      <p>Chương trình bao gồm các hạng mục khám miễn phí:</p>
      
      <h3>1. Khám lâm sàng:</h3>
      <ul>
        <li>Khám nội tổng quát</li>
        <li>Đo huyết áp, cân nặng, chiều cao</li>
        <li>Đo đường huyết</li>
        <li>Tư vấn dinh dưỡng và lối sống</li>
      </ul>
      
      <h3>2. Xét nghiệm:</h3>
      <ul>
        <li>Công thức máu</li>
        <li>Sinh hóa: đường huyết, mỡ máu, chức năng gan thận</li>
        <li>Nước tiểu tổng quát</li>
      </ul>
      
      <h3>3. Chẩn đoán hình ảnh:</h3>
      <ul>
        <li>Chụp X-quang phổi</li>
        <li>Siêu âm tổng quát ổ bụng</li>
        <li>Điện tim</li>
      </ul>
      
      <h2>Thời gian và địa điểm</h2>
      <p><strong>Thời gian:</strong></p>
      <ul>
        <li>Từ ngày 01/03/2026 đến 31/03/2026</li>
        <li>Thứ 2 - Thứ 6: 7h00 - 11h00</li>
        <li>Thứ 7: 7h00 - 10h00 (chỉ tại Trung tâm chính)</li>
      </ul>
      
      <p><strong>Địa điểm:</strong></p>
      <ul>
        <li>Trung tâm Y tế Liên Chiểu (trụ sở chính)</li>
        <li>Trạm Y tế các phường (theo lịch cụ thể)</li>
      </ul>
      
      <h2>Lịch khám tại các phường</h2>
      <table>
        <tr><td>Phường Hòa Hiệp Bắc:</td><td>05-06/03/2026</td></tr>
        <tr><td>Phường Hòa Hiệp Nam:</td><td>07-08/03/2026</td></tr>
        <tr><td>Phường Hòa Khánh Bắc:</td><td>12-13/03/2026</td></tr>
        <tr><td>Phường Hòa Khánh Nam:</td><td>14-15/03/2026</td></tr>
        <tr><td>Phường Hòa Minh:</td><td>19-20/03/2026</td></tr>
      </table>
      
      <h2>Giấy tờ cần mang theo</h2>
      <ul>
        <li>CMND/CCCD (bản gốc)</li>
        <li>Sổ khám bệnh (nếu có)</li>
        <li>Giấy xác nhận hộ nghèo/cận nghèo (với hộ nghèo)</li>
        <li>Sổ ưu đãi (với gia đình chính sách)</li>
      </ul>
      
      <h2>Đăng ký tham gia</h2>
      <p>Để thuận tiện trong việc tổ chức, đề nghị bà con đăng ký trước qua:</p>
      <ul>
        <li>Hotline: 0236.123.4567</li>
        <li>Trực tiếp tại Trung tâm Y tế Liên Chiểu</li>
        <li>Qua UBND phường nơi cư trú</li>
      </ul>
      
      <h2>Lưu ý quan trọng</h2>
      <ul>
        <li>Đến sớm để tránh chờ đợi lâu</li>
        <li>Nhịn đói 8-10 tiếng trước khi xét nghiệm máu</li>
        <li>Mang theo nước uống và đồ ăn nhẹ (dùng sau khi lấy máu)</li>
        <li>Tuân thủ các quy định về phòng chống dịch</li>
      </ul>
    `,
    category: "Y tế cộng đồng",
    tags: ["khám bệnh", "miễn phí", "cộng đồng", "người cao tuổi"],
    metaTitle: "Chương Trình Khám Sức Khỏe Miễn Phí Tháng 3/2026 | Liên Chiểu",
    metaDesc:
      "Thông tin chi tiết về chương trình khám sức khỏe miễn phí dành cho người cao tuổi và hộ nghèo tại Liên Chiểu tháng 3/2026.",
    status: "PUBLISH",
    thumbnail: "https://picsum.photos/seed/news005/800/450",
    view: 3421,
  },

  {
    id: "news-006",
    authorId: "2",
    title: "Đái tháo đường type 2: Triệu chứng, nguyên nhân và cách phòng ngừa",
    shortDesc:
      "Tìm hiểu về bệnh đái tháo đường type 2 - căn bệnh nguy hiểm nhưng có thể phòng ngừa được bằng lối sống lành mạnh.",
    content: `
      <h2>Đái tháo đường type 2 là gì?</h2>
      <p>Đái tháo đường type 2 là tình trạng cơ thể không sử dụng insulin hiệu quả (kháng insulin) hoặc tuyến tụy không sản xuất đủ insulin để duy trì lượng đường huyết ở mức bình thường.</p>
      
      <h2>Triệu chứng nhận biết</h2>
      <p>Đái tháo đường type 2 thường phát triển từ từ, các triệu chứng có thể bao gồm:</p>
      <ul>
        <li>Khát nước nhiều hơn bình thường</li>
        <li>Đi tiểu nhiều, đặc biệt vào ban đêm</li>
        <li>Mệt mỏi, uể oải</li>
        <li>Sụt cân không rõ nguyên nhân</li>
        <li>Vết thương lâu lành</li>
        <li>Nhiễm trùng thường xuyên</li>
        <li>Nhìn mờ</li>
        <li>Tê tay chân</li>
      </ul>
      
      <h2>Nguyên nhân và yếu tố nguy cơ</h2>
      <h3>Các yếu tố không thể thay đổi:</h3>
      <ul>
        <li>Tuổi tác: Nguy cơ tăng sau 45 tuổi</li>
        <li>Di truyền: Có người thân mắc bệnh</li>
        <li>Chủng tộc: Người châu Á có nguy cơ cao hơn</li>
      </ul>
      
      <h3>Các yếu tố có thể kiểm soát:</h3>
      <ul>
        <li>Thừa cân, béo phì (BMI ≥ 23 với người châu Á)</li>
        <li>Lối sống ít vận động</li>
        <li>Chế độ ăn không lành mạnh</li>
        <li>Hút thuốc lá</li>
        <li>Tăng huyết áp</li>
        <li>Mỡ máu cao</li>
      </ul>
      
      <h2>Biến chứng nguy hiểm</h2>
      <p>Nếu không kiểm soát tốt, đái tháo đường có thể gây ra:</p>
      <ul>
        <li><strong>Tim mạch:</strong> Nhồi máu cơ tim, đột quỵ</li>
        <li><strong>Thận:</strong> Suy thận mạn, phải lọc máu</li>
        <li><strong>Mắt:</strong> Võng mạc đái tháo đường, có thể mù</li>
        <li><strong>Thần kinh:</strong> Tổn thương thần kinh ngoại biên</li>
        <li><strong>Chân:</strong> Loét chân, hoại tử, cắt cụt</li>
      </ul>
      
      <h2>Phòng ngừa đái tháo đường type 2</h2>
      <h3>1. Duy trì cân nặng hợp lý:</h3>
      <p>Giảm 5-7% trọng lượng cơ thể có thể giảm 58% nguy cơ mắc bệnh.</p>
      
      <h3>2. Tập thể dục đều đặn:</h3>
      <ul>
        <li>Ít nhất 150 phút/tuần vận động cường độ vừa</li>
        <li>Hoặc 75 phút/tuần vận động cường độ cao</li>
        <li>Kết hợp bài tập cardio và tập tạ</li>
      </ul>
      
      <h3>3. Chế độ ăn lành mạnh:</h3>
      <ul>
        <li>Ăn nhiều rau xanh, trái cây</li>
        <li>Chọn ngũ cốc nguyên hạt</li>
        <li>Hạn chế đồ ngọt, nước ngọt</li>
        <li>Giảm chất béo bão hòa</li>
        <li>Kiểm soát khẩu phần ăn</li>
      </ul>
      
      <h3>4. Bỏ thuốc lá:</h3>
      <p>Người hút thuốc có nguy cơ mắc đái tháo đường cao hơn 30-40%.</p>
      
      <h2>Chẩn đoán và theo dõi</h2>
      <p>Người có nguy cơ cao nên:</p>
      <ul>
        <li>Kiểm tra đường huyết định kỳ</li>
        <li>Xét nghiệm HbA1c mỗi 6 tháng</li>
        <li>Khám sức khỏe tổng quát hàng năm</li>
      </ul>
      
      <h2>Kết luận</h2>
      <p>Đái tháo đường type 2 là căn bệnh nguy hiểm nhưng có thể phòng ngừa được. Với lối sống lành mạnh và theo dõi sức khỏe định kỳ, bạn hoàn toàn có thể giảm thiểu nguy cơ mắc bệnh.</p>
    `,
    category: "Tin tức sức khỏe",
    tags: ["đái tháo đường", "bệnh mạn tính", "phòng ngừa", "sức khỏe"],
    metaTitle:
      "Đái Tháo Đường Type 2: Triệu Chứng, Nguyên Nhân Và Cách Phòng Ngừa",
    metaDesc:
      "Hướng dẫn nhận biết triệu chứng, nguyên nhân và cách phòng ngừa bệnh đái tháo đường type 2 hiệu quả.",
    status: "DRAFT",
    thumbnail: "https://picsum.photos/seed/news006/800/450",
    view: 0,
  },

  {
    id: "news-007",
    authorId: "14",
    title:
      "Sức khỏe tinh thần: Nhận biết và đối phó với stress trong công việc",
    shortDesc:
      "Stress công việc đang ảnh hưởng đến sức khỏe của bạn? Tìm hiểu cách nhận biết và quản lý stress hiệu quả.",
    content: `
      <h2>Stress công việc là gì?</h2>
      <p>Stress công việc là phản ứng tâm lý và thể chất khi áp lực công việc vượt quá khả năng đáp ứng của một người. Đây là vấn đề phổ biến ảnh hưởng đến hàng triệu người trên toàn thế giới.</p>
      
      <h2>Triệu chứng của stress công việc</h2>
      <h3>Triệu chứng thể chất:</h3>
      <ul>
        <li>Đau đầu thường xuyên</li>
        <li>Đau vai gáy, đau lưng</li>
        <li>Mệt mỏi kéo dài</li>
        <li>Rối loạn giấc ngủ</li>
        <li>Rối loạn tiêu hóa</li>
        <li>Tim đập nhanh</li>
      </ul>
      
      <h3>Triệu chứng tâm lý:</h3>
      <ul>
        <li>Lo âu, bồn chồn</li>
        <li>Cáu gắt, dễ nổi giận</li>
        <li>Khó tập trung</li>
        <li>Giảm động lực làm việc</li>
        <li>Cảm giác quá tải</li>
        <li>Mất tự tin</li>
      </ul>
      
      <h3>Triệu chứng hành vi:</h3>
      <ul>
        <li>Thay đổi thói quen ăn uống</li>
        <li>Tránh né trách nhiệm</li>
        <li>Trì hoãn công việc</li>
        <li>Tăng sử dụng caffeine, rượu</li>
        <li>Cô lập bản thân</li>
      </ul>
      
      <h2>Nguyên nhân gây stress công việc</h2>
      <ul>
        <li>Khối lượng công việc quá lớn</li>
        <li>Thời hạn gấp rút</li>
        <li>Môi trường làm việc độc hại</li>
        <li>Xung đột với đồng nghiệp, cấp trên</li>
        <li>Thiếu sự công nhận và khen thưởng</li>
        <li>Mất cân bằng công việc - cuộc sống</li>
        <li>Bất ổn trong công việc</li>
        <li>Thiếu quyền tự chủ</li>
      </ul>
      
      <h2>Cách quản lý stress hiệu quả</h2>
      <h3>1. Kỹ năng quản lý thời gian:</h3>
      <ul>
        <li>Lập danh sách công việc ưu tiên</li>
        <li>Chia nhỏ công việc lớn thành các phần nhỏ</li>
        <li>Học cách nói "không" khi cần thiết</li>
        <li>Sử dụng kỹ thuật Pomodoro (25 phút tập trung - 5 phút nghỉ)</li>
      </ul>
      
      <h3>2. Kỹ thuật thư giãn:</h3>
      <ul>
        <li>Hít thở sâu</li>
        <li>Thiền định 10-15 phút/ngày</li>
        <li>Yoga</li>
        <li>Nghe nhạc thư giãn</li>
        <li>Đi dạo trong thiên nhiên</li>
      </ul>
      
      <h3>3. Chăm sóc bản thân:</h3>
      <ul>
        <li>Ngủ đủ 7-8 tiếng mỗi đêm</li>
        <li>Ăn uống lành mạnh</li>
        <li>Tập thể dục đều đặn</li>
        <li>Giảm caffeine và rượu</li>
        <li>Dành thời gian cho sở thích</li>
      </ul>
      
      <h3>4. Xây dựng mối quan hệ hỗ trợ:</h3>
      <ul>
        <li>Chia sẻ với gia đình, bạn bè</li>
        <li>Xây dựng mạng lưới đồng nghiệp</li>
        <li>Tham gia các hoạt động nhóm</li>
        <li>Tìm kiếm mentor</li>
      </ul>
      
      <h3>5. Tìm kiếm sự hỗ trợ chuyên nghiệp:</h3>
      <p>Nếu stress kéo dài và ảnh hưởng nghiêm trọng đến cuộc sống, hãy:</p>
      <ul>
        <li>Tư vấn với chuyên gia tâm lý</li>
        <li>Tham gia liệu pháp nhận thức hành vi (CBT)</li>
        <li>Xem xét điều chỉnh môi trường làm việc</li>
      </ul>
      
      <h2>Khi nào cần gặp bác sĩ?</h2>
      <p>Bạn nên tìm kiếm sự trợ giúp y tế khi:</p>
      <ul>
        <li>Stress kéo dài hơn 2 tuần</li>
        <li>Ảnh hưởng nghiêm trọng đến công việc và cuộc sống</li>
        <li>Có suy nghĩ tiêu cực, tự làm hại bản thân</li>
        <li>Các triệu chứng thể chất nặng nề</li>
        <li>Sử dụng rượu hoặc thuốc để đối phó</li>
      </ul>
      
      <h2>Dịch vụ tư vấn tâm lý tại Trung tâm</h2>
      <p>Trung tâm Y tế Liên Chiểu cung cấp dịch vụ tư vấn sức khỏe tinh thần:</p>
      <ul>
        <li>Tư vấn cá nhân và nhóm</li>
        <li>Liệu pháp tâm lý</li>
        <li>Đánh giá và hỗ trợ sức khỏe tinh thần</li>
        <li>Hotline tư vấn: 0236.123.4567 (24/7)</li>
      </ul>
    `,
    category: "Chăm sóc sức khỏe",
    tags: ["sức khỏe tinh thần", "stress", "tâm lý", "công việc"],
    metaTitle: "Nhận Biết Và Quản Lý Stress Công Việc Hiệu Quả",
    metaDesc:
      "Hướng dẫn chi tiết cách nhận biết triệu chứng stress công việc và các phương pháp quản lý stress hiệu quả.",
    status: "PUBLISH",
    thumbnail: "https://picsum.photos/seed/news007/800/450",
    view: 1834,
  },

  {
    id: "news-008",
    authorId: "6",
    title: "Hướng dẫn sơ cứu cơ bản: Kỹ năng quan trọng mọi người cần biết",
    shortDesc:
      "Trang bị kiến thức sơ cứu cơ bản để xử lý các tình huống khẩn cấp, có thể cứu sống người khác trong những phút quan trọng.",
    content: `
      <h2>Tại sao cần học sơ cứu?</h2>
      <p>Tai nạn có thể xảy ra bất cứ lúc nào và ở bất kỳ đâu. Biết cách sơ cứu đúng cách có thể:</p>
      <ul>
        <li>Cứu sống người bị nạn</li>
        <li>Giảm nguy cơ tổn thương nghiêm trọng</li>
        <li>Ngăn ngừa tình trạng xấu đi</li>
        <li>Tăng cơ hội hồi phục</li>
      </ul>
      
      <h2>Nguyên tắc cơ bản trong sơ cứu</h2>
      <h3>3 chữ "A" trong sơ cứu:</h3>
      <ul>
        <li><strong>Assess (Đánh giá):</strong> Đánh giá tình hình an toàn</li>
        <li><strong>Alert (Báo động):</strong> Gọi cấp cứu 115</li>
        <li><strong>Attend (Chăm sóc):</strong> Tiến hành sơ cứu</li>
      </ul>
      
      <h3>Thứ tự ưu tiên:</h3>
      <ol>
        <li>Đảm bảo an toàn cho bản thân và nạn nhân</li>
        <li>Gọi cấp cứu 115</li>
        <li>Kiểm tra ý thức, hô hấp, mạch</li>
        <li>Xử lý các vấn đề đe dọa tính mạng trước</li>
        <li>Chờ xe cấp cứu đến</li>
      </ol>
      
      <h2>1. Sơ cứu người ngừng tim</h2>
      <h3>Nhận biết:</h3>
      <ul>
        <li>Không có ý thức</li>
        <li>Không thở hoặc thở bất thường</li>
        <li>Không có mạch</li>
      </ul>
      
      <h3>Cách xử lý - CPR (Hồi sức tim phổi):</h3>
      <ol>
        <li>Gọi cấp cứu 115 ngay lập tức</li>
        <li>Đặt nạn nhân nằm ngửa trên mặt phẳng cứng</li>
        <li>Đặt gót bàn tay lên giữa xương ức</li>
        <li>Chồng bàn tay còn lại lên trên, thẳng cánh tay</li>
        <li>Ấn mạnh, nhanh: 100-120 lần/phút, sâu 5-6cm</li>
        <li>Sau 30 lần ấn, thổi 2 hơi thở cứu hộ (nếu biết cách)</li>
        <li>Tiếp tục chu kỳ 30:2 cho đến khi cấp cứu đến</li>
      </ol>
      
      <h2>2. Sơ cứu người bị chảy máu</h2>
      <h3>Chảy máu ngoài:</h3>
      <ol>
        <li>Rửa tay hoặc đeo găng tay</li>
        <li>Dùng băng sạch ấn trực tiếp vào vết thương</li>
        <li>Giữ vững trong 10-15 phút</li>
        <li>Nếu máu thấm qua, đặt thêm băng lên trên (không bỏ băng cũ)</li>
        <li>Băng chặt vết thương sau khi cầm máu</li>
        <li>Nâng cao vùng bị thương nếu có thể</li>
      </ol>
      
      <h3>Chảy máu cam:</h3>
      <ol>
        <li>Ngồi thẳng, cúi đầu về phía trước</li>
        <li>Kẹp chặt cánh mũi trong 10 phút</li>
        <li>Thở qua miệng</li>
        <li>Chườm lạnh sống mũi</li>
        <li>Không ngửa đầu ra sau</li>
      </ol>
      
      <h2>3. Sơ cứu người bị bỏng</h2>
      <h3>Bỏng nhẹ (độ 1-2, diện tích nhỏ):</h3>
      <ol>
        <li>Dùng nước mát (không lạnh) rửa vết bỏng 10-20 phút</li>
        <li>Không chọc vỡ phồng rộp</li>
        <li>Phủ băng sạch, không dính</li>
        <li>Uống thuốc giảm đau nếu cần</li>
      </ol>
      
      <h3>Bỏng nặng (độ 3, diện tích lớn):</h3>
      <ol>
        <li>Gọi cấp cứu 115 ngay</li>
        <li>Không tháo quần áo dính vào da</li>
        <li>Phủ băng sạch, ẩm</li>
        <li>Không bôi kem, dầu, bơ, kem đánh răng</li>
        <li>Giữ ấm cho nạn nhân</li>
      </ol>
      
      <h2>4. Sơ cứu người bị ngạt thở</h2>
      <h3>Nhận biết:</h3>
      <ul>
        <li>Tay ôm cổ</li>
        <li>Không nói được</li>
        <li>Ho mạnh hoặc không ho được</li>
        <li>Mặt tái xanh, tím</li>
      </ul>
      
      <h3>Cách xử lý - Thủ thuật Heimlich:</h3>
      <ol>
        <li>Đứng sau lưng nạn nhân</li>
        <li>Khum một tay thành nắm đấm, đặt ngay trên rốn</li>
        <li>Tay còn lại ôm lấy nắm đấm</li>
        <li>Đẩy mạnh vào trong và lên trên</li>
        <li>Lặp lại cho đến khi vật lạ tống ra</li>
      </ol>
      
      <h2>5. Sơ cứu người bị gãy xương</h2>
      <ol>
        <li>Không di chuyển nạn nhân trừ khi cần thiết</li>
        <li>Cố định vùng gãy bằng nẹp tạm</li>
        <li>Chườm lạnh để giảm sưng</li>
        <li>Không cố ấn xương về đúng vị trí</li>
        <li>Chờ xe cấp cứu hoặc đưa đến bệnh viện</li>
      </ol>
      
      <h2>Tủ thuốc sơ cứu gia đình</h2>
      <p>Mỗi gia đình nên chuẩn bị:</p>
      <ul>
        <li>Băng gạc vô trùng các loại</li>
        <li>Băng dính y tế</li>
        <li>Bông gòn, cồn, nước muối sinh lý</li>
        <li>Nhiệt kế</li>
        <li>Kéo, nhíp</li>
        <li>Găng tay y tế</li>
        <li>Thuốc hạ sốt, giảm đau</li>
        <li>Thuốc khử trùng vết thương</li>
        <li>Túi chườm lạnh</li>
        <li>Sổ tay hướng dẫn sơ cứu</li>
      </ul>
      
      <h2>Lớp học sơ cứu tại Trung tâm</h2>
      <p>Trung tâm Y tế Liên Chiểu tổ chức khóa đào tạo sơ cứu cơ bản:</p>
      <ul>
        <li>Thời lượng: 4 tiếng</li>
        <li>Thực hành trên mô hình</li>
        <li>Cấp chứng chỉ</li>
        <li>Miễn phí cho cộng đồng</li>
        <li>Đăng ký: 0236.123.4567</li>
      </ul>
    `,
    category: "Chăm sóc sức khỏe",
    tags: ["sơ cứu", "kỹ năng", "an toàn", "cấp cứu"],
    metaTitle: "Hướng Dẫn Sơ Cứu Cơ Bản - Kỹ Năng Cứu Người",
    metaDesc:
      "Trang bị kiến thức sơ cứu cơ bản: CPR, cầm máu, xử lý bỏng, ngạt thở và gãy xương. Kỹ năng quan trọng mọi người cần biết.",
    status: "PUBLISH",
    thumbnail: "https://picsum.photos/seed/news008/800/450",
    view: 2678,
  },

  {
    id: "news-009",
    authorId: "11",
    title: "Chế độ ăn Địa Trung Hải: Bí quyết sống thọ và khỏe mạnh",
    shortDesc:
      "Khám phá chế độ ăn Địa Trung Hải - một trong những chế độ ăn lành mạnh nhất thế giới, giúp kéo dài tuổi thọ và phòng ngừa bệnh tật.",
    content: `
      <h2>Chế độ ăn Địa Trung Hải là gì?</h2>
      <p>Chế độ ăn Địa Trung Hải (Mediterranean Diet) là lối sống dinh dưỡng truyền thống của người dân vùng Địa Trung Hải, đặc biệt là Hy Lạp, Ý và Tây Ban Nha. Đây được UNESCO công nhận là di sản văn hóa phi vật thể của nhân loại.</p>
      
      <h2>Lợi ích sức khỏe đã được chứng minh</h2>
      <h3>1. Giảm nguy cơ bệnh tim mạch:</h3>
      <ul>
        <li>Giảm 30% nguy cơ đau tim và đột quỵ</li>
        <li>Giảm cholesterol xấu (LDL)</li>
        <li>Tăng cholesterol tốt (HDL)</li>
        <li>Giảm viêm mạch máu</li>
      </ul>
      
      <h3>2. Phòng ngừa đái tháo đường:</h3>
      <ul>
        <li>Cải thiện độ nhạy insulin</li>
        <li>Kiểm soát đường huyết tốt hơn</li>
        <li>Giảm 20-23% nguy cơ mắc đái tháo đường type 2</li>
      </ul>
      
      <h3>3. Bảo vệ não bộ:</h3>
      <ul>
        <li>Giảm nguy cơ Alzheimer</li>
        <li>Cải thiện trí nhớ và nhận thức</li>
        <li>Giảm nguy cơ trầm cảm</li>
      </ul>
      
      <h3>4. Kiểm soát cân nặng:</h3>
      <ul>
        <li>Dễ duy trì lâu dài</li>
        <li>Không cảm giác đói</li>
        <li>Giảm cân bền vững</li>
      </ul>
      
      <h2>Nguyên tắc cơ bản</h2>
      <h3>Nhóm thực phẩm chính (ăn hàng ngày):</h3>
      <ul>
        <li><strong>Rau xanh:</strong> 7-10 phần/ngày</li>
        <li><strong>Trái cây:</strong> 3-4 phần/ngày</li>
        <li><strong>Ngũ cốc nguyên hạt:</strong> Gạo lứt, yến mạch, bánh mì nguyên cám</li>
        <li><strong>Đậu, hạt:</strong> Đậu lăng, đậu chickpea, hạnh nhân, óc chó</li>
        <li><strong>Dầu ô liu:</strong> Nguồn chất béo chính</li>
        <li><strong>Thảo mộc, gia vị:</strong> Thay thế muối</li>
      </ul>
      
      <h3>Ăn thường xuyên (hàng tuần):</h3>
      <ul>
        <li><strong>Cá, hải sản:</strong> 2-3 lần/tuần (cá hồi, cá thu, cá mòi)</li>
        <li><strong>Gia cầm:</strong> 2 lần/tuần</li>
        <li><strong>Trứng:</strong> 2-4 quả/tuần</li>
        <li><strong>Sữa chua, phô mai:</strong> Vừa phải</li>
      </ul>
      
      <h3>Ăn ít (tháng 1-2 lần):</h3>
      <ul>
        <li>Thịt đỏ</li>
        <li>Đồ ngọt</li>
      </ul>
      
      <h3>Nên tránh:</h3>
      <ul>
        <li>Thực phẩm chế biến sẵn</li>
        <li>Đồ uống có đường</li>
        <li>Thịt chế biến (xúc xích, thịt nguội)</li>
        <li>Bơ, margarine</li>
      </ul>
      
      <h2>Thực đơn mẫu 1 ngày</h2>
      <h3>Bữa sáng:</h3>
      <p>Sữa chua Hy Lạp + trái cây tươi + hạt óc chó + mật ong</p>
      <p>Hoặc: Bánh mì nguyên cám + bơ + cà chua + dầu ô liu</p>
      
      <h3>Bữa trưa:</h3>
      <p>Salad rau trộn (rau xà lách, cà chua, dưa chuột, hành tây) + cá nướng + dầu ô liu + chanh</p>
      <p>Hoặc: Súp đậu lăng + bánh mì nguyên cám</p>
      
      <h3>Bữa tối:</h3>
      <p>Cá hồi nướng + rau củ nướng + gạo lứt</p>
      <p>Hoặc: Mì ống nguyên cám + sốt cà chua + rau củ + phô mai</p>
      
      <h3>Bữa phụ:</h3>
      <ul>
        <li>Hoa quả tươi</li>
        <li>Hạt hỗn hợp (hạnh nhân, óc chó)</li>
        <li>Sữa chua</li>
      </ul>
      
      <h2>Mẹo thực hành tại Việt Nam</h2>
      <h3>Thay thế phù hợp:</h3>
      <ul>
        <li><strong>Dầu ô liu:</strong> Có thể kết hợp với dầu mè, dầu bơ</li>
        <li><strong>Cá:</strong> Cá thu, cá ngừ, cá hồi tươi tại chợ</li>
        <li><strong>Ngũ cốc:</strong> Gạo lứt, yến mạch dễ mua</li>
        <li><strong>Rau:</strong> Rau xanh Việt Nam rất đa dạng</li>
      </ul>
      
      <h3>Mẹo nấu ăn:</h3>
      <ul>
        <li>Ưu tiên hấp, nướng, luộc thay vì chiên</li>
        <li>Dùng dầu ô liu cho món salad</li>
        <li>Thêm thảo mộc vào món ăn</li>
        <li>Ăn chậm, thưởng thức từng món</li>
      </ul>
      
      <h2>Lối sống Địa Trung Hải</h2>
      <p>Ngoài ăn uống, chế độ Địa Trung Hải còn bao gồm:</p>
      <ul>
        <li>Vận động thể chất đều đặn</li>
        <li>Ăn uống cùng gia đình, bạn bè</li>
        <li>Thưởng thức đồ ăn, không vội vàng</li>
        <li>Nghỉ ngơi, thư giãn đầy đủ</li>
        <li>Uống rượu vang đỏ vừa phải (nếu muốn): 1 ly/ngày</li>
      </ul>
      
      <h2>Lưu ý khi bắt đầu</h2>
      <ul>
        <li>Chuyển đổi từ từ, không vội vàng</li>
        <li>Bắt đầu với 1-2 bữa/tuần</li>
        <li>Lựa chọn thực phẩm theo mùa</li>
        <li>Đọc nhãn mác khi mua sắm</li>
        <li>Nấu ăn tại nhà nhiều hơn</li>
      </ul>
      
      <h2>Tư vấn dinh dưỡng tại Trung tâm</h2>
      <p>Phòng Dinh dưỡng - Trung tâm Y tế Liên Chiểu cung cấp:</p>
      <ul>
        <li>Tư vấn chế độ ăn cá nhân hóa</li>
        <li>Xây dựng thực đơn phù hợp</li>
        <li>Theo dõi và điều chỉnh định kỳ</li>
        <li>Lớp học nấu ăn lành mạnh</li>
      </ul>
    `,
    category: "Dinh dưỡng",
    tags: ["dinh dưỡng", "chế độ ăn", "địa trung hải", "sống khỏe"],
    metaTitle: "Chế Độ Ăn Địa Trung Hải - Bí Quyết Sống Thọ Và Khỏe Mạnh",
    metaDesc:
      "Hướng dẫn chi tiết về chế độ ăn Địa Trung Hải, lợi ích sức khỏe, thực đơn mẫu và cách thực hành tại Việt Nam.",
    status: "WAITING",
    thumbnail: "https://picsum.photos/seed/news009/800/450",
    view: 412,
  },

  {
    id: "news-010",
    authorId: "8",
    title: "Tầm soát ung thư: Những xét nghiệm quan trọng theo từng độ tuổi",
    shortDesc:
      "Hướng dẫn lịch tầm soát ung thư theo độ tuổi giúp phát hiện sớm và điều trị kịp thời, tăng tỷ lệ khỏi bệnh lên 90%.",
    content: `
      <h2>Tầm quan trọng của tầm soát ung thư</h2>
      <p>Tầm soát ung thư là việc tìm kiếm ung thư ở người chưa có triệu chứng. Phát hiện sớm giúp điều trị hiệu quả hơn, tỷ lệ khỏi bệnh cao hơn và chi phí thấp hơn.</p>
      
      <h3>Lợi ích của tầm soát:</h3>
      <ul>
        <li>Phát hiện ung thư giai đoạn sớm</li>
        <li>Tỷ lệ khỏi bệnh lên đến 90%</li>
        <li>Phương pháp điều trị ít xâm lấn hơn</li>
        <li>Giảm tỷ lệ tử vong</li>
        <li>Tiết kiệm chi phí điều trị</li>
      </ul>
      
      <h2>Tầm soát cho nữ giới</h2>
      <h3>1. Ung thư vú:</h3>
      <p><strong>Độ tuổi 20-39:</strong></p>
      <ul>
        <li>Tự khám vú hàng tháng</li>
        <li>Khám lâm sàng 1-3 năm/lần</li>
      </ul>
      
      <p><strong>Độ tuổi 40-49:</strong></p>
      <ul>
        <li>Tự khám vú hàng tháng</li>
        <li>Chụp nhũ ảnh (mammography) 1-2 năm/lần</li>
        <li>Khám lâm sàng hàng năm</li>
      </ul>
      
      <p><strong>Từ 50 tuổi trở lên:</strong></p>
      <ul>
        <li>Chụp nhũ ảnh 1-2 năm/lần</li>
        <li>Khám lâm sàng hàng năm</li>
      </ul>
      
      <h3>2. Ung thư cổ tử cung:</h3>
      <p><strong>Độ tuổi 21-29:</strong></p>
      <ul>
        <li>Xét nghiệm tế bào học (Pap smear) 3 năm/lần</li>
      </ul>
      
      <p><strong>Độ tuổi 30-65:</strong></p>
      <ul>
        <li>Xét nghiệm tế bào học 3 năm/lần</li>
        <li>Hoặc: Xét nghiệm HPV + Pap 5 năm/lần</li>
      </ul>
      
      <p><strong>Trên 65 tuổi:</strong></p>
      <ul>
        <li>Có thể ngưng tầm soát nếu kết quả trước đó âm tính</li>
      </ul>
      
      <h3>3. Ung thư buồng trứng:</h3>
      <p><strong>Nguy cơ cao (gia đình có tiền sử):</strong></p>
      <ul>
        <li>Xét nghiệm CA-125</li>
        <li>Siêu âm âm đạo</li>
        <li>Tư vấn gen BRCA</li>
      </ul>
      
      <h2>Tầm soát cho nam giới</h2>
      <h3>1. Ung thư tuyến tiền liệt:</h3>
      <p><strong>Độ tuổi 50-75:</strong></p>
      <ul>
        <li>Xét nghiệm PSA hàng năm</li>
        <li>Khám trực tràng</li>
      </ul>
      
      <p><strong>Độ tuổi 40-50 (nguy cơ cao):</strong></p>
      <ul>
        <li>Tầm soát sớm hơn nếu có gia đình mắc bệnh</li>
      </ul>
      
      <h2>Tầm soát cho cả nam và nữ</h2>
      <h3>1. Ung thư đại - trực tràng:</h3>
      <p><strong>Độ tuổi 45-75:</strong></p>
      <ul>
        <li>Nội soi đại tràng 10 năm/lần</li>
        <li>Hoặc: Xét nghiệm máu ẩn trong phân hàng năm</li>
        <li>Hoặc: Nội soi sigma 5 năm/lần</li>
      </ul>
      
      <p><strong>Nguy cơ cao:</strong></p>
      <ul>
        <li>Tầm soát sớm hơn (trước 45 tuổi)</li>
        <li>Tần suất dày hơn</li>
      </ul>
      
      <h3>2. Ung thư phổi:</h3>
      <p><strong>Độ tuổi 50-80 (người hút thuốc):</strong></p>
      <ul>
        <li>CT liều thấp hàng năm</li>
        <li>Điều kiện: Hút ≥ 20 gói-năm</li>
      </ul>
      
      <h3>3. Ung thư da:</h3>
      <p><strong>Mọi độ tuổi:</strong></p>
      <ul>
        <li>Tự kiểm tra da hàng tháng</li>
        <li>Khám da hàng năm nếu có yếu tố nguy cơ</li>
      </ul>
      
      <h3>4. Ung thư dạ dày:</h3>
      <p><strong>Độ tuổi ≥ 40 (vùng nguy cơ cao):</strong></p>
      <ul>
        <li>Nội soi dạ dày</li>
        <li>Xét nghiệm Helicobacter pylori</li>
      </ul>
      
      <h3>5. Ung thư gan:</h3>
      <p><strong>Nguy cơ cao (viêm gan B, C, xơ gan):</strong></p>
      <ul>
        <li>Siêu âm gan 6 tháng/lần</li>
        <li>Xét nghiệm AFP</li>
      </ul>
      
      <h2>Yếu tố nguy cơ cần tầm soát sớm</h2>
      <ul>
        <li>Gia đình có người mắc ung thư</li>
        <li>Tiền sử bản thân mắc ung thư</li>
        <li>Hút thuốc lá</li>
        <li>Uống rượu nhiều</li>
        <li>Béo phì</li>
        <li>Nhiễm virus: HPV, HBV, HCV</li>
        <li>Chế độ ăn không lành mạnh</li>
        <li>Ít vận động</li>
      </ul>
      
      <h2>Dấu hiệu cảnh báo cần khám ngay</h2>
      <p>Không nên chờ đến kỳ tầm soát nếu có:</p>
      <ul>
        <li>Khối u bất thường</li>
        <li>Chảy máu không rõ nguyên nhân</li>
        <li>Sụt cân không giải thích được</li>
        <li>Mệt mỏi kéo dài</li>
        <li>Đau dai dẳng</li>
        <li>Thay đổi thói quen đại tiện</li>
        <li>Khó nuốt</li>
        <li>Ho kéo dài</li>
      </ul>
      
      <h2>Chi phí tầm soát ung thư</h2>
      <p>Tại Trung tâm Y tế Liên Chiểu, chúng tôi cung cấp các gói tầm soát:</p>
      
      <h3>Gói tầm soát cơ bản (Nam):</h3>
      <ul>
        <li>Khám lâm sàng</li>
        <li>Xét nghiệm PSA</li>
        <li>Xét nghiệm máu ẩn phân</li>
        <li>X-quang phổi</li>
      </ul>
      
      <h3>Gói tầm soát cơ bản (Nữ):</h3>
      <ul>
        <li>Khám lâm sàng</li>
        <li>Pap smear</li>
        <li>Chụp nhũ ảnh</li>
        <li>Xét nghiệm máu ẩn phân</li>
        <li>X-quang phổi</li>
      </ul>
      
      <h3>Gói tầm soát toàn diện:</h3>
      <ul>
        <li>Tất cả các xét nghiệm cơ bản</li>
        <li>Nội soi đại tràng</li>
        <li>CT phổi liều thấp</li>
        <li>Siêu âm ổ bụng</li>
        <li>Xét nghiệm dấu ấn ung thư</li>
      </ul>
      
      <h2>Đăng ký tầm soát</h2>
      <p>Liên hệ ngay:</p>
      <ul>
        <li>Hotline: 0236.123.4567</li>
        <li>Email: tamsoat@lienchieuhealth.vn</li>
        <li>Trực tiếp tại Trung tâm</li>
      </ul>
      
      <p><strong>Ưu đãi:</strong> Giảm 20% cho khách hàng đăng ký online trong tháng 3/2026</p>
    `,
    category: "Tin tức sức khỏe",
    tags: ["ung thư", "tầm soát", "phát hiện sớm", "sức khỏe"],
    metaTitle: "Lịch Tầm Soát Ung Thư Theo Độ Tuổi - Phát Hiện Sớm Cứu Sống",
    metaDesc:
      "Hướng dẫn đầy đủ các xét nghiệm tầm soát ung thư quan trọng theo từng độ tuổi, giúp phát hiện sớm và điều trị kịp thời.",
    status: "DRAFT",
    thumbnail: "https://picsum.photos/seed/news010/800/450",
    view: 0,
  },
];
