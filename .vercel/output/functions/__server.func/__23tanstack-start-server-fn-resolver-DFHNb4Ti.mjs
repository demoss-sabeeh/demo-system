//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-DFHNb4Ti.js
var manifest = {
	"4d793d084f61da582101050f1afa312a70d12c1f84d8b3fe4c193412e1cacbd7": {
		functionName: "createBooking_createServerFn_handler",
		importer: () => import("./_ssr/public.functions-BiwDD7y_.mjs")
	},
	"6caef2925de9e4e98c5044614bc5c918b332ef423a5a3d6cd6cd0e080281ab64": {
		functionName: "submitQuoteRequest_createServerFn_handler",
		importer: () => import("./_ssr/public.functions-BiwDD7y_.mjs")
	},
	"86129e4c7268f8be0cdf7a195a2f9016ecee01b3146fb26228660942afd10124": {
		functionName: "getAvailability_createServerFn_handler",
		importer: () => import("./_ssr/public.functions-BiwDD7y_.mjs")
	},
	"89ac62f1516609b9e1b35c7159f82ca06a5c6c5a4d11e54d32c6b142adcb06ef": {
		functionName: "askAssistant_createServerFn_handler",
		importer: () => import("./_ssr/public.functions-BiwDD7y_.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ??= await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
