import { i as __toESM } from "../_runtime.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-B2pxHB9K.mjs";
import { D as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-ucW4KZNp.mjs";
import { t as OperantMark } from "./OperantMark-BVvioElz.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as inputCls, t as Field } from "./Wizard-Owx_W0mg.mjs";
import { t as createLovableAuth } from "../_libs/lovable.dev__cloud-auth-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Bj2tCxyS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var lovableAuth = createLovableAuth();
var lovable = { auth: { signInWithOAuth: async (provider, opts) => {
	const result = await lovableAuth.signInWithOAuth(provider, {
		...opts,
		extraParams: { ...opts?.extraParams }
	});
	if (result.redirected) return result;
	if (result.error) return result;
	try {
		await supabase.auth.setSession(result.tokens);
	} catch (e) {
		return { error: e instanceof Error ? e : new Error(String(e)) };
	}
	return result;
} } };
function AuthPage() {
	const nav = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		setBusy(true);
		try {
			if (mode === "in") {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
				nav({ to: "/admin" });
			} else {
				const { data, error } = await supabase.auth.signUp({
					email,
					password,
					options: { emailRedirectTo: `${window.location.origin}/admin` }
				});
				if (error) throw error;
				if (data.session) nav({ to: "/admin" });
				else toast.success("Check your email to confirm your account, then sign in.");
			}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Sign-in failed");
		} finally {
			setBusy(false);
		}
	}
	async function google() {
		const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/auth` });
		if (r.error) return toast.error("Google sign-in failed");
		if (r.redirected) return;
		nav({ to: "/admin" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden flex-col justify-between bg-navy p-12 text-navy-foreground lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperantMark, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow text-sky",
						children: "Detailing Business Operating System"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md font-display text-5xl leading-tight",
						children: "One connected system for capturing, managing, converting, and retaining detailing customers."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm tracking-[0.2em] text-navy-muted",
						children: "CAPTURE → MANAGE → CONVERT → RETAIN"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-navy-muted",
					children: "Demo workspace · Apex Auto Detailing (fictional)"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-navy lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperantMark, { dark: true })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-8 font-display text-4xl text-navy",
						children: mode === "in" ? "Sign in" : "Create account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-slate",
						children: "Access the Apex Auto Detailing demo workspace."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "mt-8 h-11 w-full",
						onClick: google,
						children: "Continue with Google"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-6 flex items-center gap-3 text-xs text-slate",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
							"or",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Email",
								htmlFor: "email",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "email",
									type: "email",
									required: true,
									autoComplete: "email",
									className: inputCls,
									value: email,
									onChange: (e) => setEmail(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Password",
								htmlFor: "pw",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "pw",
									type: "password",
									required: true,
									minLength: 8,
									autoComplete: mode === "in" ? "current-password" : "new-password",
									className: inputCls,
									value: password,
									onChange: (e) => setPassword(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								className: "h-11 w-full",
								disabled: busy,
								children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), mode === "in" ? "Sign in" : "Create account"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-center text-sm text-slate",
						children: [mode === "in" ? "New here? " : "Have an account? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "font-semibold text-primary",
							onClick: () => setMode(mode === "in" ? "up" : "in"),
							children: mode === "in" ? "Create an account" : "Sign in"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-10 text-center text-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "text-slate hover:text-navy",
							children: "← Back to Apex website"
						})
					})
				]
			})
		})]
	});
}
//#endregion
export { AuthPage as component };
