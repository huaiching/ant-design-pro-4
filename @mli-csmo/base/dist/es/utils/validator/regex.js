export var REG_POINT_ZH_EN = /[^0-9\s]/;
export var REG_PHONE = /^09\d{8}$/;
export var REG_LANDLINE = /^\d{2,3}-?\d{7,8}$/;
export var REG_MAIL = /^\w{1,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,10}$/;
// 字母或數字
export var REG_LETTER_OR_NUM = /^[a-zA-Z\d]+$/;
export var REG_POS_AND_NEG_NUM = /^(\-)?\d+$/;
export var REG_NEG_NUM = /^(\-)\d+$/;
export var REG_NEG_NUM_OR_ZERO = /^0|(\-)\d+$/;
export var REG_NUM_OR_ZERO = /^\d+$/;