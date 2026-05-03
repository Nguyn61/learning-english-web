1. Transition là gì?

transition dùng để tạo hiệu ứng chuyển đổi mượt giữa 2 trạng thái CSS.

Ví dụ: khi hover, thay vì đổi màu “đột ngột”, nó sẽ chuyển từ từ.

2. Cú pháp cơ bản
   transition: property duration timing-function delay;
3. Các thành phần quan trọng

4. property (thuộc tính muốn animate)
   transition: all 0.3s;

Hoặc cụ thể hơn (khuyến khích):

transition: background 0.3s, transform 0.2s; 2. duration (thời gian)
transition: 0.3s;
0.2s → nhanh
0.5s → mượt
1s+ → chậm (dùng cho animation đặc biệt) 3. timing-function (kiểu chuyển động)

Một số cái hay dùng:

ease (mặc định) → chậm → nhanh → chậm
linear → đều
ease-in → chậm đầu
ease-out → chậm cuối
ease-in-out → mượt đều

Ví dụ:

transition: transform 0.3s ease-in-out; 4. delay (độ trễ)
transition: all 0.3s ease 0.2s;

👉 chờ 0.2s rồi mới bắt đầu
