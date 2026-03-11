import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "../../styles/components.module.css";
import { TitleForm, Button, Form, TextArea, Image, Item, Toast } from "../../components/ui";
import { useForm, useValidation } from "../../components/hooks";
import { INITAL_NEWS } from "../../constants/field";
import { validateNewsReject } from "../../utils/validation";
import { useNewsStore } from "../../store/newsStore";

const cx = classNames.bind(style);

function Reject({ onClose, news }) {
  const [toast, setToast] = useState();
  const { updateNews } = useNewsStore();
  const { validate, validateField, setAllTouched, getFieldError } = useValidation(validateNewsReject);
  const { values, setFieldValue } = useForm({
    initialValues: INITAL_NEWS,
    editValues: news,
  });

  const handleBlur = (fieldName) => {
    validateField(fieldName, values);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateNewsReject(values);

    if (Object.keys(errors).length > 0) {
      setAllTouched(values);

      setToast({
        type: "INFO",
        message: errors.rejectReason,
      });

      return;
    }

    if (news?.id) {
      updateNews(values);
      setToast({
        type: "SUCCESS",
        message: "Cập nhật lý do từ chối bài viết thành công",
      });
    }

    // Gửi data lên server
    console.log("Submit data:", values);
    // submitDoctor(values);
  };

  return (
    <>
      <TitleForm
        title={"Từ chối bài viết"}
        subTitle={"Nhập lý do để tác giả biết và cải thiện."}
        onClose={onClose}
        className="bg-linear-[var(--color-ln-error)]"
      />

      <Form id="rejectForm" className={cx("p-3 md:p-6 bg-white")} onSubmit={handleSubmit}>
        <div
          className={cx(
            "bg-[var(--color-unavailable-100)] rounded-xl p-3",
            "border border-[var(--color-unavailable-300)]",
            "flex items-center gap-2 mb-[18px]",
          )}
        >
          <div className={cx("h-[52px] w-[52px]")}>
            <Image
              width={52}
              height={52}
              src={news?.thumbnail}
              alt="Ảnh đại diện"
              className={cx(
                "border-2 border-transparent rounded-xl",
                "transition-ease duration-[0.2]",
                "bg-[var(--color-unavailable-300)]/50",
              )}
            />
          </div>
          <div>
            <Item
              as="span"
              children={news?.category?.name}
              itemClassName={cx("text-[11px] font-bold text-[var(--color-primary)]")}
            />
            <Item
              children={news?.title}
              itemClassName={cx("text-[12px] text-start font-bold")}
              className={cx("mt-[4px]")}
            />
          </div>
        </div>

        {/* Reason to reject */}
        <TextArea
          label={
            <span>
              Lý do từ chối <span className="text-red-500">*</span>
            </span>
          }
          name={"rejectReason"}
          row={50}
          value={values?.rejectReason}
          onChange={(val) => setFieldValue("rejectReason", val.target.value)}
          onBlur={() => handleBlur("rejectReason")}
          error={getFieldError("rejectReason")}
          placeholder="Vd:Nội dung thiếu khoa học, cần bổ sung nguồn trích dẫn..."
          labelClassName={cx("text-[11.5px] font-bold")}
          inputClassName={cx("rounded-xl")}
        />
      </Form>

      <div className={cx("flex gap-3 w-full bg-white px-3 py-6 md:p-6", "border-t border-gray-200")}>
        <Button
          type={"button"}
          width="100%"
          height={38}
          children={"Huỷ"}
          onClick={onClose}
          className={cx(
            "text-[var(--color-unavailable-900)] font-semibold transition-all duration-200",
            "bg-[var(--color-unavailable-100)] hover:bg-[var(--color-unavailable-300)]",
            "rounded-xl",
            "font-semibold text-[13px]",
          )}
        />
        <Button
          form={"rejectForm"}
          width="100%"
          height={38}
          children={"Xác nhận"}
          //   onClick={handleConfirmDelete}
          className={cx("bg-linear-[var(--color-ln-error)] rounded-xl", "text-white font-semibold text-[13px]")}
        />
      </div>

      <Toast
        visible={!!toast}
        duration={3000}
        position="bottom-right"
        onClose={() => setToast(null)}
        type={toast?.type}
        content={toast?.message}
      />
    </>
  );
}

export default React.memo(Reject);
