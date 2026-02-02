import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { Warning } from "../helpers/utils";

export const commonApiSlice = createApi({
	reducerPath: 'commonApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_BACKEND_URI,
		prepareHeaders: (headers, { getState }) => {
			headers.set('Accept', 'application/json')
			headers.set('Content-Type', 'application/json')
			headers.set("asmara-token", localStorage.getItem('asmara-token'))
			headers.set("Authorization", `Bearer ${localStorage.getItem('asmara-token')}`)
			return headers
		}
	}),

	endpoints: builder => ({

		getNotifications: builder.query({
			query: () => {
				return {
					url: `/config/notifications`,
					method: "GET"
				}
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
				} catch ({ error }) {
					const { status, data } = error
					if (status === 400 && data.message.indexOf('getaddrinfo') !== -1) {
						dispatch({ type: "NOT_CONNECTED" });
					}
				}
			}
		}),
		
		makePayment: builder.mutation({
			query: payload => ({
				url: `/orders/create`,
				method: "POST",
				body: payload
			}),
			invalidatesTags: ['Tables', 'Order'],
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log(data);
				} catch (error) {
					console.error("❌ Error:", error);
				}
			}
		}),

		getOrders: builder.query({
			query: () => 'orders',
			providesTags: ["Order"],
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					if (data.status) {
						dispatch({
							type: "TABLE_ORDERS_BULK",
							payload: data.tableOrders
						});
					}
				} catch ({ error }) {
					const { status, data } = error;
					if (status === 400 && data.message.indexOf('getaddrinfo') !== -1) {
						dispatch({ type: "NOT_CONNECTED" });
					}
				}
			}
		}),
		
		updateItem: builder.mutation({
			query: (fd) => ({
				url: `/item/update`,
				method: 'POST',
				headers: {
					"Accept": "application/json",
					"Content-Type": "multipart/form-data",
					"asmara-token": localStorage.getItem('asmara-token')
				},
				body: fd
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
				} catch ({ error }) {
					const { status, data } = error
					if (status === 400 && data.message.indexOf('getaddrinfo') !== -1) {
						dispatch({ type: "NOT_CONNECTED" });
					}
				}
			}
		}),

		deleteProduct: builder.mutation({
			query: ({ id }) => ({
				url: `/products/remove/${id}`,
				method: "GET",
			}),
			async onQueryStarted(args, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled;
					if (data.status) {
						if (data.disconnected) {
							Warning("Product not deleted on phone due to internet!")
						}
						if (!data.data.status) {
							toast("Product not removed from mobile, Since the application key is not registered! Sync the products to register!",
								{
									icon: '⚠️',
									style: {
										borderRadius: '10px',
										background: '#333',
										color: '#fff',
									},
									duration: 9999
								}
							);
						}
						toast.success(data.message)
					} else {
						toast.error(data.message)
					}

					dispatch(
						commonApiSlice.util.updateQueryData('getProducts', undefined, (draft) => {
							let { products } = draft
							if (products) {
								draft['products'] = products?.filter(product => product?.id !== parseInt(args.id))
							}
						})
					)
					dispatch(
						commonApiSlice.util.updateQueryData('getPosItems', undefined, draft => {
							let { products } = draft;
							if (products) {
								draft['products'] = products.filter(item => item.id !== parseInt(args.id))
							}
						})
					)
				} catch ({ error }) {
					const { status, data } = error;
					if (status === 400 && data.message.indexOf('getaddrinfo') !== -1) { // .indexOf('getaddrinfo') !== -1
						dispatch({ type: "NOT_CONNECTED" })
					}
				}
			}
		}),
		getCustomers: builder.query({
			query: () => `/pos/customers`
		}),
		getSettings: builder.query({
			query: () => ({
				url: `/config/settings`,
				method: 'GET'
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
				} catch ({ error }) {
					const { status, data } = error
					if (status === 400 && data.message.indexOf('getaddrinfo') !== -1) {
						dispatch({ type: "NOT_CONNECTED" });
					}
				}
			}
		})
	})
})

const initialState = {
	loading: true,
	data: [],
	error: ''
}

const centerSlice = createSlice({
	name: 'api',
	initialState,
	reducers: {
		updateItem(state, action) {
			const { id, data } = action.payload;
			const item = state.items.find(item => item.id === id);
			if (item) {
				Object.assign(item, data); // Update the item with new data
			}
		},
	},

})

export default centerSlice.reducer

export const {
	useDeleteProductMutation,
	useMakePaymentMutation,
	useGetNotificationsQuery,
	useGetOrdersQuery,
	useGetCustomersQuery,
	useGetSettingsQuery,
} = commonApiSlice;

export const { updateItem } = centerSlice.actions;